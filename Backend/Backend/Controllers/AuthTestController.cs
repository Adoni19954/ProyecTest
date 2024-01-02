using Microsoft.AspNetCore.Http;
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
                });

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
                    new Claim(ClaimTypes.Name,$"{auths.username}"),
                    new Claim(ClaimTypes.Upn,$"{auths.rutaImg}"),
                    new Claim(ClaimTypes.Gender,$"{auths.Id}")
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

        [HttpPut("perfil")]
        public async Task<IActionResult> ModificationProfile([FromBody] AuthTest auth)
        {
            var dbprofile = await _Context.auths.FindAsync(auth.Id);

            if (dbprofile == null)
                return BadRequest("solicitud no validad");

            dbprofile.username = auth.username;
            dbprofile.rutaImg = auth.rutaImg;

            await _Context.SaveChangesAsync();

            dbprofile.Token = CreateJwt(auth);

            return Ok(new
            {
                Token = dbprofile,
                message = "actualizado"
            });

        }


        [HttpGet("Buscar")]

        public async Task<IActionResult> LokforUsername(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return BadRequest("se requiere el username");
            }

            var dbLotFokFor = await _Context.auths.Where(x => x.username.Contains(username)).ToArrayAsync();

            if (dbLotFokFor == null || !dbLotFokFor.Any())
            {
                return BadRequest("usuario encontrado");
            }



            return Ok(dbLotFokFor);
        }

        [HttpPut("changes")]
        public async Task<IActionResult> UpdateChangesPassoword(string password, int Id, string passwordConfin)
        {
            var dbpassword = await _Context.auths.FirstOrDefaultAsync(x => x.password.Contains(password) && x.Id == Id);
            if (dbpassword != null)
            {

                dbpassword.password = passwordConfin;

                await _Context.SaveChangesAsync();
                return Ok("contrasena actualizada");
            }

            return NotFound(new
            {
                message = "Usuario no encontrado o contraseña incorrecta"
            });
        }

    }
}
