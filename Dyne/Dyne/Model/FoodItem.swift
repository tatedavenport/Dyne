//
//  FoodItem.swift
//  Dyne
//
//  Created by Malek Amiri on 10/10/20.
//  Copyright © 2020 Malek Amiri. All rights reserved.
//

import Foundation

class FoodItem {
    
    var name: String
    var imageUrl: String
    var price: Double
    var description: String
    var category: String
    var isPopular: Bool
    
    init(name: String, imageUrl: String, price: Double, description: String, category: String, isPopular: Bool) {
        self.name = name;
        self.imageUrl = imageUrl;
        self.price = price;
        self.description = description;
        self.category = category;
        self.isPopular = isPopular;
    }
}
