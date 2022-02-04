using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyPay.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string  FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string FireBaseId { get; set; }
        public bool IsAdmin { get; set; }
        public UserProfileAddress UserProfileAddress { get; set; }
        public Address Address { get; set; }

    }
}
