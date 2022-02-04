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
    public class AddressRepository : BaseRepository, IAddressRepository
    {


        public AddressRepository(IConfiguration configuration) : base(configuration) { }


        public Address GetAddressById(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      select A.Id, A.Street, A.Apt, A.State, A.ZipCode from Address A
                        WHERE A.Id = @Id";
                    cmd.Parameters.AddWithValue("@id", id);

                    Address address = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        address = new Address()
                        {

                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Street = reader.GetString(reader.GetOrdinal("Street")),
                            Apt = reader.GetInt32(reader.GetOrdinal("Apt")),
                            state = reader.GetString(reader.GetOrdinal("State")),
                            


                        };

                    }

                    reader.Close();

                    return address;
                }
            }


        }




        public List<Address> GetAllAddress()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    select A.Id, A.Street, A.Apt, A.State, A.ZipCode, UP.Id UserProfileId, UP.FirstName, UP.LastName, UP.FireBaseId, UP.Email, UP.IsAdmin,UA.Id UserProfileAddressId, UA.AddressId, UA.UserProfileId 
from Address A
left join UserProfileAddress UA on UA.AddressId = a.Id
left join UserProfile UP on UA.UserProfileId = UP.Id
                    
              ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var address = new List<Address>();
                        while (reader.Read())
                        {
                            address.Add(new Address()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Street = reader.GetString(reader.GetOrdinal("Street")),
                                Apt = reader.GetInt32(reader.GetOrdinal("Apt")),
                                state = reader.GetString(reader.GetOrdinal("State")),
                                ZipCode = reader.GetInt32(reader.GetOrdinal("ZipCode")),
                                UserProfile = new UserProfile
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    FireBaseId = DbUtils.GetString(reader, "FireBaseId"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    IsAdmin = DbUtils.GetBool(reader, "IsAdmin"),

                                },

                                UserProfileAddress = new UserProfileAddress
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileAddressId")),
                                    AddressId = reader.GetInt32(reader.GetOrdinal("AddressId")),
                                    UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId"))
                                }


                            });
                        }

                        return address;
                    }
                }
            }
        }



        public void AddAddress(Address address)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Address (Street, Apt, State,ZipCode )
                                        OUTPUT INSERTED.ID
                                        VALUES (@Street, @Apt, @State, @ZipCode)";
                    cmd.Parameters.AddWithValue("@Street", address.Street);
                    cmd.Parameters.AddWithValue("@Apt", address.Apt);
                    cmd.Parameters.AddWithValue("@State", address.state);
                    cmd.Parameters.AddWithValue("@ZipCode", address.ZipCode);

                    address.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void AddUserProfileAddress(int addressId, int userProfileId)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfileAddress (AddressId, UserProfileId)
                                        
                                        VALUES (@addressId, @userprofileId)";
                    cmd.Parameters.AddWithValue("@addressId", addressId);
                    cmd.Parameters.AddWithValue("@userprofileId", userProfileId);
                    cmd.ExecuteNonQuery();
                }
            }

        }



        public void UpdateAddress(Address address)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Address
                        SET 
                            Street = @street, 
                            Apt = @apt, 
                            State = @state, 
                            ZipCode = @zipCode
                          
                       WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@street", address.Street);
                    cmd.Parameters.AddWithValue("@apt", address.Apt);
                    cmd.Parameters.AddWithValue("@state", address.state);
                    cmd.Parameters.AddWithValue("@zipCode", address.ZipCode);

                    cmd.Parameters.AddWithValue("@id", address.Id);

                    cmd.ExecuteNonQuery();

                }
            }

        }



        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Address WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }




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

