using Microsoft.AspNetCore.Mvc;
using System;
using EasyPay.Models;
using EasyPay.Repositories;

namespace EasyPay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressRepository _addressRepository;

        public AddressController(IAddressRepository billRepository, IUserProfileRepository userProfileRepository)
        {
            _addressRepository = billRepository;

        }

        [HttpGet("GetAllAddress")]
        public IActionResult Get()
        {
            return Ok(_addressRepository.GetAllAddress());
        }

        [HttpGet("GetAddressById")]
        public IActionResult GetBillById(int id)
        {
            return Ok(_addressRepository.GetAddressById(id));
        }

        [HttpPost]
        public IActionResult Post(Models.Address address)
        {
            
            _addressRepository.AddAddress(address);
            _addressRepository.AddUserProfileAddress(address.Id, address.UserProfile.Id);
            return CreatedAtAction("Get", new { id = address.Id }, address);
            
        }



        [HttpPut("UpdateAddress")]
        public IActionResult Put(int id, Address address)
        {
            if (id != address.Id)
            {
                return BadRequest();
            }

            _addressRepository.UpdateAddress(address);
            return NoContent();
        }

        [HttpDelete("{id}")]

        public IActionResult Delete(int id)
        {
            _addressRepository.Delete(id);
            return NoContent();
        }









    }
}
