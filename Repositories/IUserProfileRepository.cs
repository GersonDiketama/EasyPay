using System;
using EasyPay.Models;

namespace EasyPay.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);

        //void Add(UserProfile userProfile);
        System.Collections.Generic.List<UserProfile> GetAllUsers();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserProfileById(int id);
        UserProfile GetUserProfileId(int id);
    }
}