using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyPay.Models;
using EasyPay.Utils;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EasyPay.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {


        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }


        public UserProfile GetUserProfileId(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        select up.Id, up.FirebaseUserId, up.FirstName, up.LastName,up.Email,up.IsAdmin, UA.Id UserProfileAddressId, UA.AddressId, UA.UserProfileId, A.Id AddressId, A.Street, A.Apt, A.State, A.ZipCode  
from UserProfile up
left join UserProfileAddress UA on UA.UserProfileId = up.Id
left join Address A on A.Id = UA.AddressId

                        WHERE u.Id = @Id";
                    cmd.Parameters.AddWithValue("@id", id);

                    UserProfile userProfile = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FireBaseId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                            LastName = reader.GetString(reader.GetOrdinal("LastName")),
                            IsAdmin = reader.GetBoolean(reader.GetOrdinal("IsAdmin")),
                           UserProfileAddress = new UserProfileAddress
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal ("UserProfileAddressId")),
                                    AddressId = reader.GetInt32(reader.GetOrdinal ("AddressId")),
                                    UserProfileId = reader.GetInt32(reader.GetOrdinal ("UserProfileId"))
                                }
                        };

                    }

                    reader.Close();

                    return userProfile;
                }
            }


        }


        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       select up.Id, up.FireBaseId, up.FirstName, up.LastName,up.Email,up.IsAdmin
from UserProfile up
                         WHERE FireBaseId = @FireBaseId";

                    DbUtils.AddParameter(cmd, "@FireBaseId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FireBaseId = DbUtils.GetString(reader, "FireBaseId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),                     
                            Email = DbUtils.GetString(reader, "Email"),
                            IsAdmin = DbUtils.GetBool(reader, "IsAdmin"),
                            

                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public List<UserProfile> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    Select up.Id, up.FirstName, up.LastName,up.Email, up.FireBaseId, up.IsAdmin
                    From UserProfile up
                    
              ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var users = new List<UserProfile>();
                        while (reader.Read())
                        {
                            users.Add(new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                             Email = DbUtils.GetString(reader, "Email"),
                             FireBaseId = DbUtils.GetString(reader, "FireBaseId"),
                             IsAdmin = DbUtils.GetBool(reader, "IsAdmin")

                            });
                        }

                        return users;
                    }
                }
            }
        }

        public UserProfile GetUserProfileById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        select up.Id, up.FireBaseId, up.FirstName, up.LastName,up.Email,up.IsAdmin, UA.Id UserProfileAddressId, UA.AddressId, UA.UserProfileId, A.Id AddressId, A.Street, A.Apt, A.State, A.ZipCode  
from UserProfile up
left join UserProfileAddress UA on UA.UserProfileId = up.Id
left join Address A on A.Id = UA.AddressId
                        Where up.Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        UserProfile userProfile = null;

                        if (reader.Read())
                        {
                            userProfile = new UserProfile
                            {
                                Id = id,
                                Email = DbUtils.GetString(reader, "Email"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                FireBaseId = DbUtils.GetString(reader, "FireBaseId"),
                                IsAdmin = DbUtils.GetBool(reader, "IsAdmin"),
                                UserProfileAddress = new UserProfileAddress
                                {
                                    Id = DbUtils.GetInt(reader, ("UserProfileAddressId")),
                                    AddressId = DbUtils.GetInt(reader, ("AddressId")),
                                    UserProfileId = DbUtils.GetInt(reader, ("UserProfileId")),

                                },


                                Address = new Models.Address()
                                {

                                    Id = DbUtils.GetInt(reader, "AddressId"),
                                    Street = DbUtils.GetString(reader, "Street"),
                                    Apt = DbUtils.GetInt(reader, "Apt"),
                                    state = DbUtils.GetString(reader, "State"),
                                    ZipCode = DbUtils.GetInt(reader, "ZipCode")


                                }


                            };

                        }
                        return userProfile;


                    }
                }
            }
        }


        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FireBaseId, FirstName, LastName, DisplayName, 
                                                                 Email, CreateDateTime, ImageLocation, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FireBaseId, @FirstName, @LastName, @DisplayName, 
                                                @Email, @CreateDateTime, @ImageLocation, @UserTypeId)";
                    DbUtils.AddParameter(cmd, "@FireBaseId", userProfile.FireBaseId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.IsAdmin);
                    

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        //public void ReactivateAndDeactivate(UserProfile userProfile)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();

        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                UPDATE UserProfile
        //                SET 
        //                    DisplayName = @displayName, 
        //                    FirstName = @firstName, 
        //                    LastName = @lastName, 
        //                    Email = @email,
        //                    CreateDateTime = @createDateTime,
        //                    ImageLocation = @imageLocation,
        //                    IsActive = @isActive,
        //                    UserTypeId = @userTypeId
        //               WHERE Id = @id";

        //            cmd.Parameters.AddWithValue("@displayName", userProfile.DisplayName);
        //            cmd.Parameters.AddWithValue("@firstName", userProfile.FirstName);
        //            cmd.Parameters.AddWithValue("@lastName", userProfile.LastName);
        //            cmd.Parameters.AddWithValue("@email", userProfile.Email);
        //            cmd.Parameters.AddWithValue("@createDateTime", userProfile.CreateDateTime);
        //            if (userProfile.ImageLocation == null)
        //            {
        //                cmd.Parameters.AddWithValue("@imagelocation", DBNull.Value);
        //            }
        //            else
        //            {
        //                cmd.Parameters.AddWithValue("@imageLocation", userProfile.ImageLocation);
        //            }
        //            cmd.Parameters.AddWithValue("@isActive", userProfile.IsActive);
        //            cmd.Parameters.AddWithValue("@userTypeId", userProfile.UserTypeId);
        //            cmd.Parameters.AddWithValue("@id", userProfile.Id);





        //            cmd.ExecuteNonQuery();

        //        }
        //    }

        //}



        /*
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                       .Include(up => up.UserType) 
                       .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }
        */
    }

}

