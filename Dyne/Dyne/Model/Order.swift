//
//  Order.swift
//  Dyne
//
//  Created by Marcelo Costa on 10/28/20.
//  Copyright © 2020 Malek Amiri. All rights reserved.
//

import Foundation

struct SimpleFoodItem {
    var foodItemId: String
    var count: Int
}

class Order {
    
    var foodItems: [SimpleFoodItem]
    var date: Date
    var userID: String
    var restID: String
    var location: String
    var tip: Double
    
    init(foodItems: [SimpleFoodItem], date: Date, userID: String, restID: String, location: String, tip: Double) {
        self.foodItems = foodItems;
        self.date = date;
        self.userID = userID;
        self.restID = restID;
        self.location = location;
        self.tip = tip;
    }
}
