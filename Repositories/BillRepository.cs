using EasyPay.Models;
using Microsoft.Extensions.Configuration;

using System.Collections.Generic;


using Microsoft.Data.SqlClient;


namespace EasyPay.Repositories
{
    public class BillRepository : BaseRepository, IBillRepository
    {


        public BillRepository(IConfiguration configuration) : base(configuration) { }


        public Bill GetBillId(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      select b.Id, b.Amount, b.AddressId, b.IsPaid, A.Id, A.Street, A.Apt, A.State, A.ZipCode from Bill b
left join Address A on A.Id = b.AddressId

            where b.Id = @id
                        ";
                    cmd.Parameters.AddWithValue("@id", id);

                    Bill bill = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        bill = new Bill()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Amount = reader.GetInt32(reader.GetOrdinal("Amount")),
                            AddressId = reader.GetInt32(reader.GetOrdinal("AddressId")),
                            IsPaid = reader.GetBoolean(reader.GetOrdinal("IsPaid")),
                            Address = new Address
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Street = reader.GetString(reader.GetOrdinal("Street")),
                                Apt = reader.GetInt32(reader.GetOrdinal("Apt")),
                                state = reader.GetString(reader.GetOrdinal("State")),
                                ZipCode = reader.GetInt32(reader.GetOrdinal("ZipCode"))
                            }
                        };

                    }

                    reader.Close();

                    return bill;
                }
            }


        }




        public List<Bill> GetAllBills()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    select b.Id, b.Amount, b.AddressId, b.IsPaid, A.Id, A.Street, A.Apt, A.State, A.ZipCode from Bill b
left join Address A on A.Id = b.AddressId
                    
              ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var bills = new List<Bill>();
                        while (reader.Read())
                        {
                            bills.Add(new Bill()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Amount = reader.GetInt32(reader.GetOrdinal("Amount")),
                                AddressId = reader.GetInt32(reader.GetOrdinal("AddressId")),
                                IsPaid = reader.GetBoolean(reader.GetOrdinal("IsPaid")),
                                Address = new Address
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                    Street = reader.GetString(reader.GetOrdinal("Street")),
                                    Apt = reader.GetInt32(reader.GetOrdinal("Apt")),
                                    state = reader.GetString(reader.GetOrdinal("State")),
                                    ZipCode = reader.GetInt32(reader.GetOrdinal("ZipCode"))
                                }

                            });
                        }

                        return bills;
                    }
                }
            }
        }



        public void AddBill(Bill bill)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Bill (Amount, IsPaid, AddressId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Amount, @IsPaid, @AddressId)";
                    cmd.Parameters.AddWithValue("@Amount", bill.Amount);
                    cmd.Parameters.AddWithValue("@AddressId", bill.AddressId);
                    cmd.Parameters.AddWithValue("@IsPaid", bill.IsPaid);

                    bill.Id = (int)cmd.ExecuteScalar();
                }
            }
        }




        public void UpdatePaidBill(Bill bill)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Bill
                        SET 
                            Amount = @amount, 
                            AddressId = @addressId, 
                            IsPaid = @ispaid 
                          
                       WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@amount", bill.Amount);
                    cmd.Parameters.AddWithValue("@addressId", bill.AddressId);
                    cmd.Parameters.AddWithValue("@ispaid", bill.IsPaid);

                    cmd.Parameters.AddWithValue("@id", bill.Id);

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

