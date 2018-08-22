Gigabank Client Project

#RNNRootViewController.m#
------------------------------------------------------------------------------------------------------
OLD
------------------------------------------------------------------------------------------------------
- (void)navigationController:(UINavigationController *)navigationController didShowViewController:(UIViewController *)viewController animated:(BOOL)animated{
	RNNRootViewController* vc =  (RNNRootViewController*)viewController;
	if (![vc.options.topBar.backButton.transition isEqualToString:@"custom"]){
		navigationController.delegate = nil;
	}
}
------------------------------------------------------------------------------------------------------
NEW:
------------------------------------------------------------------------------------------------------
- (void)navigationController:(UINavigationController *)navigationController didShowViewController:(UIViewController *)viewController animated:(BOOL)animated{
	
	if ([viewController isKindOfClass:RNNRootViewController.class]) {
		RNNRootViewController* vc =  (RNNRootViewController*)viewController;
		if (![vc.options.topBar.backButton.transition isEqualToString:@"custom"]){
			navigationController.delegate = nil;
		}
	}/* else if ([viewController isKindOfClass:RNNSideMenuController.class]) {
		RNNRootViewController* vc =  ((RNNSideMenuController*)viewController).getLeafViewController;
		if (![vc.options.topBar.backButton.transition isEqualToString:@"custom"]){
			navigationController.delegate = nil;
		}
	}*/
}

#RNNModalManager.m#
------------------------------------------------------------------------------------------------------
OLD
------------------------------------------------------------------------------------------------------
-(void)showModal:(BOOL)animated {
	UIViewController* topVC = [self topPresentedVC];
	topVC.definesPresentationContext = YES;
	
	if ([topVC conformsToProtocol:@protocol(RNNRootViewProtocol)]) {
		UIViewController<RNNRootViewProtocol> *navigationTopVC = (UIViewController<RNNRootViewProtocol>*)topVC;
		RNNNavigationOptions* options = navigationTopVC.getLeafViewController.options;
		if (options.animations.showModal.hasCustomAnimation) {
			self.toVC.transitioningDelegate = navigationTopVC;
		}
	}
	
	[topVC presentViewController:self.toVC animated:animated completion:^{
		if (_completionBlock) {
			_completionBlock();
			_completionBlock = nil;
		}
		self.toVC = nil;
	}];
}
------------------------------------------------------------------------------------------------------
NEW
------------------------------------------------------------------------------------------------------

-(void)showModal:(BOOL)animated {
	UIViewController* topVC = [self topPresentedVC];
	topVC.definesPresentationContext = YES;
	
	if ([topVC conformsToProtocol:@protocol(RNNRootViewProtocol)]) {
		UIViewController<RNNRootViewProtocol> *navigationTopVC = (UIViewController<RNNRootViewProtocol>*)topVC;
		id rootViewController = navigationTopVC.getLeafViewController;
		//DuongNT: fixed here
		if ([rootViewController isKindOfClass:RNNRootViewController.class]) {
			RNNNavigationOptions* options = navigationTopVC.getLeafViewController.options;
			if (options.animations.showModal.hasCustomAßnimation) {
				self.toVC.transitioningDelegate = navigationTopVC;
			}
		}
	}
	
	[topVC presentViewController:self.toVC animated:animated completion:^{
		if (_completionBlock) {
			_completionBlock();
			_completionBlock = nil;
		}
		self.toVC = nil;
	}];
}