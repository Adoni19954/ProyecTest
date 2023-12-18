﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Date;
using Backend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthTestController : ControllerBase
    {
        private readonly DataContext _Context;
        private readonly IWebHostEnvironment _environment;

        public AuthTestController(DataContext context, IWebHostEnvironment environment)
        {
            _Context = context;
            _environment = environment;
        }


        [HttpGet]

        public async Task<ActionResult<List<DataContext>>> Get()
        {
            return Ok(await _Context.auths.ToArrayAsync());
        }

        [HttpPost("authenticator")]

        public async Task<IActionResult> authenticator([FromBody] AuthTest authsT)
        {
            if (authsT == null)
                return BadRequest();
            var dbauth = await _Context.auths.FirstOrDefaultAsync(x => x.username == authsT.username && x.password == authsT.password);

            if (dbauth == null)
                return NotFound(new
                {
                    message = "Usuario no encotrado"
                }) ;

            dbauth.Token = CreateJwt(dbauth);

            return Ok(new
            {
                Token = dbauth.Token,
                message = "Inicio de Session exitoso"
            });
        }

        [HttpPost("register")]

        public async Task<IActionResult> registro([FromBody] AuthTest authsT)
        {
            if (authsT == null)
                return BadRequest("Error del sistema");

            await _Context.auths.AddAsync(authsT);
            await _Context.SaveChangesAsync();

            return Ok(new
            {
                message = "Usuario Registrado Correctamente"
            });

        }

        [HttpPost]

        public string CreateJwt(AuthTest auths)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("abcdefghijklmnopqrstuvwx1234ABCD!@#$%^\r\n");
                var identity = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Role, auths.role),
                    new Claim(ClaimTypes.Name,$"{auths.username}")
                });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials,
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }


        [HttpPut]

        public async Task<ActionResult<List<DataContext>>> PutAuths(AuthTest AuthsT)
        {
            var dbauths = await _Context.auths.FindAsync(AuthsT.Id);

            if (dbauths == null)
                return BadRequest();

            dbauths.role = AuthsT.role;
            dbauths.rutaImg = AuthsT.rutaImg;

            await _Context.SaveChangesAsync();
            return Ok(await _Context.auths.ToArrayAsync());
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<List<DataContext>>> DeleteAuth(int id)
        {
            var dbauths = await _Context.auths.FindAsync(id);

            if (dbauths == null)
                return BadRequest();

            _Context.auths.Remove(dbauths);
            await _Context.SaveChangesAsync();
            return Ok(await _Context.auths.ToArrayAsync());

        }

        [HttpPost("savesImage")]
        public async Task<IActionResult> SaveImage()
        {
            try
            {
                var archivo = Request.Form.Files[0];

                if (archivo.Length > 0)
                {
                    var uploads = Path.Combine(_environment.WebRootPath, "uploads");
                    var nombreArchivoUnico = archivo.FileName;
                    var rutaArchivo = Path.Combine(uploads, nombreArchivoUnico);

                    if (!Directory.Exists(uploads))
                    {
                        Directory.CreateDirectory(uploads);
                    }

                    using (var flujoArchivo = new FileStream(rutaArchivo, FileMode.Create))
                    {
                        await archivo.CopyToAsync(flujoArchivo);
                    }

                    var entidad = new AuthTest
                    {
                        rutaImg = nombreArchivoUnico
                        
                    };

                    _Context.auths.Add(entidad);
                    _Context.SaveChanges();

                    return Ok(new { entidad.Id, entidad.rutaImg });
                }
                else
                {
                    return BadRequest("Ningún archivo subido");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex}");
            }
        }




    }
}
