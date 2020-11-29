//
//  ViewController.swift
//  Dyne
//
//  Created by Malek Amiri on 10/10/20.
//  Copyright © 2020 Malek Amiri. All rights reserved.
//

import UIKit
import AVFoundation
import QRCodeReader

class ViewController: UIViewController, QRCodeReaderViewControllerDelegate {

    // MARK: Variables
    var restaurants: [Restaurant]?
    var selectedRestaurant: Restaurant?
    
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
    
    // MARK: QRCodeReader
    // Good practice: create the reader lazily to avoid cpu overload during the
    // initialization and each time we need to scan a QRCode
    lazy var readerVC: QRCodeReaderViewController = {
        let builder = QRCodeReaderViewControllerBuilder {
            $0.reader = QRCodeReader(metadataObjectTypes: [.qr], captureDevicePosition: .back)
            
            // Configure the view controller (optional)
            $0.showTorchButton        = false
            $0.showSwitchCameraButton = false
            $0.showCancelButton       = false
            $0.showOverlayView        = true
            $0.rectOfInterest         = CGRect(x: 0.2, y: 0.2, width: 0.6, height: 0.6)
        }
        
        return QRCodeReaderViewController(builder: builder)
    }()

    func scanAction(restaurant: Restaurant) {
        // Retrieve the QRCode content
        // By using the delegate pattern
        readerVC.delegate = self

        // Or by using the closure pattern
        readerVC.completionBlock = { (result: QRCodeReaderResult?) in
        if let result = result {
            print(result.value)
            if let nav = self.navigationController {
                RestaurantMenuVC.present(for: restaurant, image: UIImage(), in: nav)
            }
        }
        }

        // Presents the readerVC as modal form sheet
        readerVC.modalPresentationStyle = .formSheet

        present(readerVC, animated: true, completion: nil)
        
        Timer.scheduledTimer(withTimeInterval: 3, repeats: false) { (timer) in
            self.dismiss(animated: true, completion: nil)
            
            if let nav = self.navigationController {
                RestaurantMenuVC.present(for: restaurant, image: UIImage(), in: nav)
            }
        }
    }

    // MARK: - QRCodeReaderViewController Delegate Methods

    func reader(_ reader: QRCodeReaderViewController, didScanResult result: QRCodeReaderResult) {
        reader.stopScanning()

        dismiss(animated: true, completion: nil)
        
        
    }

    //This is an optional delegate method, that allows you to be notified when the user switches the cameraName
    //By pressing on the switch camera button
    func reader(_ reader: QRCodeReaderViewController, didSwitchCamera newCaptureDevice: AVCaptureDeviceInput) {
//        if let cameraName = newCaptureDevice.device.localizedName {
//          print("Switching capture to: \(cameraName)")
//        }
    }

    func readerDidCancel(_ reader: QRCodeReaderViewController) {
        reader.stopScanning()
        dismiss(animated: true, completion: nil)
      
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
                selectedRestaurant = restaurant
                scanAction(restaurant: restaurant)
                
            }
        }
    }
}

