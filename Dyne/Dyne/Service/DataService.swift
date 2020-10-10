//
//  DataService.swift
//  Dyne
//
//  Created by Malek Amiri on 10/10/20.
//  Copyright © 2020 Malek Amiri. All rights reserved.
//

import Foundation
import SwiftyJSON
import Alamofire

class DataService {
    // MARK: - Properties

    private static var sharedDataService: DataService = {
        let dataService = DataService(baseURL: "http://localhost:8080/")

        // Configuration

        return dataService
    }()

    // MARK: - Variables
    let baseURL: String

    // Initialization
    private init(baseURL: String) {
        self.baseURL = baseURL
    }

    // MARK: - Accessors
    class func shared() -> DataService {
        return sharedDataService
    }
    
    // Gets restaurants' names, ids etc..
    func getRestaurants(completion: @escaping ([Restaurant]?) -> Void) {
        var url = baseURL + "restaurants"
        AF.request(url).responseJSON { (response) in
            switch response.result {
            case .success(let value):
                let json = JSON(value)
                var restaurants = [Restaurant]()
                for i in 0..<json.count {
                    restaurants.append(Restaurant(name: json[i]["name"].stringValue, imageUrl: json[i]["imageUrl"].stringValue, description: "", hours: "Open", id: json[i]["id"].stringValue))
                }
                
                completion(restaurants)
                
            case .failure(let error):
                print("Restaurant fetching failed")
                print(error.errorDescription)
            }
        }
    }

    // Gets restaurants' menu items
    func getRestaurantMenu(id: String, completion: @escaping ([FoodItem]?) -> Void) {
        var url = baseURL + "restaurants/" + id + "/menu"
        AF.request(url).responseJSON { (response) in
            switch response.result {
            case .success(let value):
                let json = JSON(value)

                var foodItemsIds = [FoodItem]()
                for i in 0..<json.count {
                    foodItemsIds.append(FoodItem(name: json[i]["name"].stringValue, imageUrl: json[i]["imageUrl"].stringValue, price: json[i]["price"].doubleValue, description: json[i]["description"].stringValue, category: json[i]["category"].stringValue, isPopular: true))
                }
                
                completion(foodItemsIds)
                
            case .failure(let error):
                print("Restaurant fetching failed")
                print(error.errorDescription)
            }
        }
    }

}

