using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class DateImg : DbContext
    {
        public int id { get; set; }

        public string name { get; set; } = string.Empty;

        public string rutaimg { get; set; } = string.Empty;
    }
}
