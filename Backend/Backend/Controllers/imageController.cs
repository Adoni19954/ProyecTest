using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Date;
using Backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class imageController : ControllerBase
    {
        private readonly DataContext _Context;
        private readonly IWebHostEnvironment _environment;

        public imageController(DataContext context, IWebHostEnvironment environment)
        {
            _Context = context;
            _environment = environment;
        }

        // imageController.cs
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            try
            {
                var archivo = Request.Form.Files[0];

                if (archivo.Length > 0)
                {
                    var uploads = Path.Combine(_environment.WebRootPath, "uploads");
                    var nombreArchivoUnico = Guid.NewGuid().ToString() + "_" + archivo.FileName;
                    var rutaArchivo = Path.Combine(uploads, nombreArchivoUnico);

                    if (!Directory.Exists(uploads))
                    {
                        Directory.CreateDirectory(uploads);
                    }

                    using (var flujoArchivo = new FileStream(rutaArchivo, FileMode.Create))
                    {
                        await archivo.CopyToAsync(flujoArchivo);
                    }

                    // Guardar la ruta en la base de datos
                    var entidad = new DateImg
                    {
                        rutaimg = nombreArchivoUnico
                        // Puedes asignar otros campos de la entidad según tus necesidades
                    };

                    _Context.dateImgs.Add(entidad);
                    _Context.SaveChanges();

                    return Ok(new { entidad.id, entidad.rutaimg });
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


        [HttpGet]
        public async Task<ActionResult<List<DataContext>>> Get()
        {
            try
            {
                List<DateImg> data = await _Context.dateImgs.ToListAsync();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex}");
            }
        }



    }
}
