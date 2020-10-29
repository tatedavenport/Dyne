//
//  CartVC.swift
//  Dyne
//
//  Created by Marcelo Costa on 10/28/20.
//  Copyright © 2020 Malek Amiri. All rights reserved.
//

import UIKit

class CartVC: UIViewController {
    //MARK: Variables
    var foodItems: [FoodItem]?
    var restaurant: Restaurant?
    var location: String?
    
    // MARK: Interface
    @IBOutlet weak var orderTableView: UITableView!
    @IBOutlet weak var locationLabel: UILabel!
    @IBOutlet weak var totalPriceLabel: UILabel!
    @IBOutlet weak var sendOrderButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        orderTableView.delegate = self
        orderTableView.dataSource = self
        
        locationLabel.text = location
        totalPriceLabel.text = "$\(foodItems?.reduce(0) { $0 + $1.price} ?? 0.00)"
    }
    
    // MARK: Presentation
    static func present(for restaurant: Restaurant, foodItems: [FoodItem], location: String, in navigationController: UINavigationController) {
            let storyboard = UIStoryboard(name: "Main", bundle: nil)
            let cartVC = storyboard.instantiateViewController(withIdentifier: "cartVC") as! CartVC

            cartVC.restaurant = restaurant
            cartVC.foodItems = foodItems
            cartVC.location = location
            navigationController.pushViewController(cartVC, animated: true)
        }
}

extension  CartVC: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return foodItems?.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = orderTableView.dequeueReusableCell(withIdentifier: "foodItemCell") as? FoodItemCell else {
                return UITableViewCell()
            }
        if let item = foodItems?[indexPath.row] {
            cell.setUpCell(name: item.name, price: item.price)
        }
        return cell
    }
    
    func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            foodItems?.remove(at: indexPath.row)
            self.orderTableView.deleteRows(at: [indexPath], with: .fade)
        }
    }
    
    
}
