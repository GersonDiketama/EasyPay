using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyPay.Models
{
    public class Bill
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public bool IsPaid { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        
    }
}
