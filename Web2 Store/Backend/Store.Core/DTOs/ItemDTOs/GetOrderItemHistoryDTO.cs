﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.DTOs.ItemDTOs
{
    public class GetOrderItemHistoryDTO
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public string ArticleName { get; set; }
    }
}
