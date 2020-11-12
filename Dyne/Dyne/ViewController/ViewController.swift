//
//  ViewController.swift
//  Dyne
//
//  Created by Malek Amiri on 10/10/20.
//  Copyright © 2020 Malek Amiri. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    // MARK: Variables
    var restaurants: [Restaurant]?
    
    // MARK: Interface
    @IBOutlet weak var restaurantTableView: UITableView!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        restaurantTableView.delegate = self
        restaurantTableView.dataSource = self
        
        
//        restaurants = [Restaurant(name: "Naka Sushi", imageUrl: "", description: "Nice sushi", hours: "Open"),
//                       Restaurant(name: "Pasta Della Nona", imageUrl: "", description: "Nice pasta", hours: "Open"),
//                       Restaurant(name: "Giovanni's pizzeria", imageUrl: "", description: "Nice pizza", hours: "Open")]
        
        DataService.shared().getRestaurants { (restaurants) in
            self.restaurants = restaurants
            self.restaurantTableView.reloadData()
            
            if let rests = self.restaurants {
                for i in 0..<rests.count {
                    // Do any additional setup after loading the view, typically from a nib.
                    print("Begin of code")
                    if let url = URL(string: rests[i].imageUrl) {
                        self.downloadImage(from: url, restaurantIndex: i)
                        print("End of code. The image will continue downloading in the background and it will be loaded when it ends.")
                    }
                }
            }
            
            
        }
    }

    func downloadImage(from url: URL, restaurantIndex: Int) {
        print("Download Started")
        getData(from: url) { data, response, error in
            guard let data = data, error == nil else { return }
            print(response?.suggestedFilename ?? url.lastPathComponent)
            print("Download Finished")
            DispatchQueue.main.async() { [weak self] in
                self?.restaurants?[restaurantIndex].image = UIImage(data: data)
                self?.restaurantTableView.reloadData()
            }
        }
    }

    func getData(from url: URL, completion: @escaping (Data?, URLResponse?, Error?) -> ()) {
        URLSession.shared.dataTask(with: url, completionHandler: completion).resume()
    }
}

// MARK: Table View Delegate and DataSource
extension ViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return restaurants?.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = restaurantTableView.dequeueReusableCell(withIdentifier: "restaurantCell") as? RestaurantListCell else {
            return UITableViewCell()
        }
        if let restaurant = restaurants?[indexPath.row] {
            
            // Get image from restaurant.imageUrl
            cell.setUpCell(restaurantName: restaurant.name, minWait: 0, open: "Open", ratings: 4.2, image: restaurant.image)
        }
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        if let restaurant = restaurants?[indexPath.row],
            let nav = self.navigationController {
            if (restaurant.hours == "Open") {
                RestaurantMenuVC.present(for: restaurant, image: UIImage(), in: nav)
            }
        }
    }
}

