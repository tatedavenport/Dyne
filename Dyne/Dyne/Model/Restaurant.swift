//
//  Restaurant.swift
//  Dyne
//
//  Created by Malek Amiri on 10/10/20.
//  Copyright © 2020 Malek Amiri. All rights reserved.
//

import UIKit

class Restaurant {
    var name: String
    var imageUrl: String
    var description: String
    var hours: String
//    var foodItemIds
    var id: String
    var image: UIImage?
    
    init(name: String, imageUrl: String, description: String, hours: String, id: String) {
        self.name = name
        self.imageUrl = imageUrl
        self.description = description
        self.hours = hours
        self.id = id
    }
}
