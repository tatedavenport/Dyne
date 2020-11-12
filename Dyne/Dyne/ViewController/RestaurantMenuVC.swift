//
//  RestaurantMenuVC.swift
//  Dyne
//
//  Created by Malek Amiri on 10/10/20.
//  Copyright © 2020 Malek Amiri. All rights reserved.
//

import UIKit

class RestaurantMenuVC: UIViewController {

    // MARK: Variables
    var restaurant: Restaurant?
    var name: String = ""
    var foodItems: [FoodItem]?
    
    // MARK: Interface
    @IBOutlet weak var menuTableView: UITableView!
    @IBOutlet weak var restaurantImage: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        menuTableView.delegate = self
        menuTableView.dataSource = self
        
        restaurantImage.image = restaurant?.image
        
        DataService.shared().getRestaurantMenu(id: restaurant?.id ?? "") { (foodItems) in
            self.foodItems = foodItems
            
            self.menuTableView.reloadData()
        }
        
    }
    
    // MARK: Presentation
    static func present(for restaurant: Restaurant, image: UIImage, in navigationController: UINavigationController) {
            let storyboard = UIStoryboard(name: "Main", bundle: nil)
            let restaurantVC = storyboard.instantiateViewController(withIdentifier: "restaurantMenuVC") as! RestaurantMenuVC

            restaurantVC.restaurant = restaurant
            navigationController.pushViewController(restaurantVC, animated: true)
        }

}

extension RestaurantMenuVC: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return foodItems?.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = menuTableView.dequeueReusableCell(withIdentifier: "foodItemCell") as? FoodItemCell else {
            return UITableViewCell()
        }
        if let item = foodItems?[indexPath.row] {
            cell.setUpCell(name: item.name, price: item.price)
        }
        
        return cell
    }
    
    
}
