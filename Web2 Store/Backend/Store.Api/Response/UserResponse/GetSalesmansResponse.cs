﻿namespace Store.Api.Response.UserResponse
{
    public class GetSalesmansResponse
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public DateTime Birthday { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Picture { get; set; }
        public string Verification { get; set; }
    }
}
