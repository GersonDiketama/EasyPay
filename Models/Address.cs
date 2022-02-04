using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyPay.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string Street { get; set; }
        public int  Apt { get; set; }
        public int ZipCode { get; set; }
        public string state { get; set; }  
        public UserProfile UserProfile { get; set; } 

        public UserProfileAddress UserProfileAddress { get; set; }
    }
}
