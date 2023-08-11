using System.ComponentModel.DataAnnotations;

namespace Store.Api.Request.UserRequest
{
    public class RegisterUserRequest
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [RegularExpression("^(Customer|Salesman)$", ErrorMessage = "Role must be either 'Customer' or 'Seller'.")]
        public string Role { get; set; }
        [Required]
        public IFormFile File { get; set; }
    }
}
