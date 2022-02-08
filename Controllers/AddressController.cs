using Microsoft.AspNetCore.Mvc;
using System;
using EasyPay.Models;
using EasyPay.Repositories;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace EasyPay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AddressController : ControllerBase
    {
        private readonly IAddressRepository _addressRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public AddressController(IAddressRepository billRepository, IUserProfileRepository userProfileRepository)
        {
            _addressRepository = billRepository;
            _userProfileRepository = userProfileRepository;

        }

        [HttpGet("GetAllAddress")]
        public IActionResult Get()
        {
            return Ok(_addressRepository.GetAllAddress());
        }

        [HttpGet("GetAddressById/{id}")]
        public IActionResult GetAddressById(int id)
        {
            return Ok(_addressRepository.GetAddressById(id));
        }

        [HttpPost]
        public IActionResult Post(Models.Address address)
        {
            
            
            _addressRepository.AddAddress(address);
            
            _addressRepository.AddUserProfileAddress(address.Id, GetCurrentUserProfile().Id);
            return CreatedAtAction("GetAddressById", new { id = address.Id }, address);
            
        }
         


        [HttpPut("UpdateAddress/{id}")]
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


        
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }






    }
}
