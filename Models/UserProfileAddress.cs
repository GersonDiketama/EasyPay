using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyPay.Models
{
    public class UserProfileAddress
    {
        public int Id { get; set; }
        public int AddressId { get; set; }
        public int UserProfileId { get; set; }
        public Address Address { get; set; }
    }
}
