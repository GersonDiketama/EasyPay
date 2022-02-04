using System.Collections.Generic;

namespace EasyPay.Repositories
{
    public interface IAddressRepository
    {
        void AddAddress(Models.Address address);
        void AddUserProfileAddress(int addressId, int userProfileId);
        void Delete(int id);
        Models.Address GetAddressById(int id);
        List<Models.Address> GetAllAddress();
        void UpdateAddress(Models.Address address);
    }
}