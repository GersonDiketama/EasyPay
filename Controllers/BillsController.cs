using Microsoft.AspNetCore.Mvc;
using System;
using EasyPay.Models;
using EasyPay.Repositories;

namespace EasyPay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillsController : ControllerBase
    {
        private readonly IBillRepository _billRepository;
        
        public BillsController(IBillRepository billRepository, IUserProfileRepository userProfileRepository)
        {
            _billRepository = billRepository;
            
        }

        [HttpGet("GetAllBills")]
        public IActionResult Get()
        {
            return Ok(_billRepository.GetAllBills());
        }

        [HttpGet("GetBillById")]
        public IActionResult GetBillById(int id)
        {
            return Ok(_billRepository.GetBillId(id));
        }

        [HttpPost]
        public IActionResult Post(Bill bill)
        {
            _billRepository.AddBill(bill);
            return CreatedAtAction("Get", new { id = bill.Id }, bill);
        }

        [HttpPut("UpdatePaidBill/{id}")]
        public ActionResult UpdatePaidBill(int id)
        {
            
            Bill bill = _billRepository.GetBillId(id);
            bill.IsPaid = true;
            _billRepository.UpdatePaidBill(bill);

            return Ok();


        }






        




    }
}
