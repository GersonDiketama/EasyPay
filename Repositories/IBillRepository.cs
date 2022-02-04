using EasyPay.Models;
using System.Collections.Generic;

namespace EasyPay.Repositories
{
    public interface IBillRepository
    {
        void AddBill(Bill bill);
        List<Bill> GetAllBills();
        Bill GetBillId(int id);
        void UpdatePaidBill(Bill bill);
    }
}