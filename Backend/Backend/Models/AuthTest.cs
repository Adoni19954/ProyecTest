namespace Backend.Models
{
    public class AuthTest
    {
        public int Id { get; set; }
        public string username { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string role { get; set; } = string.Empty;
        public string Token {  get; set; } = string.Empty;
        public string rutaImg { get; set; } = string.Empty;
    }
}
