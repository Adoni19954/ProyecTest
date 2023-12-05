using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Date;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccionController : ControllerBase
    {
        private DataContext _Context;

        public AccionController(DataContext context)
        {
            _Context = context;
        }

        [HttpGet]

        public async Task<ActionResult<List<DataContext>>> GET()
        {
            return Ok(await _Context.models.ToArrayAsync());
        }

        [HttpPost]

        public async Task<ActionResult<List<DataContext>>> POST(ModelsTest model)
        {
            var dbPost = await _Context.models.AddAsync(model);
            await _Context.SaveChangesAsync();
            return Ok(await _Context.models.ToArrayAsync());
        }

        [HttpPut]

        public async Task<ActionResult<List<DataContext>>>  PUT(ModelsTest model)
        {
            var dbput = await _Context.models.FindAsync(model.Id);
            if (dbput == null) 
                return BadRequest(ModelState);
            dbput.Name = model.Name;
            dbput.LastName = model.LastName;
            dbput.Sexo = model.Sexo;
            dbput.cedula =  model.cedula;

            await _Context.SaveChangesAsync();
            return Ok(await _Context.models.ToArrayAsync());
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<List<DataContext>>> DELETE(int id)
        {
            var dbdelete = await _Context.models.FindAsync(id);
            if(dbdelete == null)
                return BadRequest("fue eliminado");

            _Context.models.Remove(dbdelete);
            await _Context.SaveChangesAsync();
            return Ok(await _Context.models.ToArrayAsync());
        }

    }
}
