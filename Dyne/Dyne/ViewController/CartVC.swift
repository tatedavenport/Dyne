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
    
    // MARK: Interface
    @IBOutlet weak var orderTableView: UITableView!
    @IBOutlet weak var locationLabel: UILabel!
    @IBOutlet weak var totalPriceLabel: UILabel!
    @IBOutlet weak var SendOrderButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        orderTableView.delegate = self
        orderTableView.dataSource = self
        
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
    
    
}
