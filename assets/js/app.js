// Utility Functions
const showToast = (message) => {
	const toast = $(`<div class="toast-message">${message}</div>`);
	$('#toast-container').append(toast);
	toast.css({
		padding: '10px 20px',
		background: '#333',
		color: '#fff',
		borderRadius: '5px',
		marginBottom: '10px',
		opacity: 0,
		transition: 'opacity 0.5s',
	});
	setTimeout(() => toast.css('opacity', 1), 10);
	setTimeout(() => {
		toast.css('opacity', 0);
		setTimeout(() => toast.remove(), 500);
	}, 3000);
};

const packages = [
	{
		tier: 1,
		name: "Chika's Cheerful Support",
		price: 50,
		icon: '🌟',
		description: "Support Chika's adventures with a cheerful donation!",
		benefits: [
			'Activate a single group chat (GC) with the bot for 1 week.',
			'Your name featured in a supporter list.',
			'No feature unlocks, but your support is greatly appreciated!',
		],
	},
	{
		tier: 2,
		name: "Chika's Secret Plan",
		price: 100,
		icon: '🎯',
		description: "Unlock Chika's secret plan and enjoy exclusive perks!",
		benefits: [
			'Activate a single group chat (GC) with the bot for 1 month.',
			'Priority access to bot updates and announcements.',
			'All Tier 1 benefits.',
		],
	},
	{
		tier: 3,
		name: "Chika's Supreme Strategy",
		price: 200,
		icon: '🎯',
		description: "Boost Chika's supreme strategy and double the fun!",
		benefits: [
			'Activate a group chat with the bot for 2 months.',
			'Priority access to new features as they roll out.',
			'Personalized thank-you video message from Chika.',
			'All Tier 1 and Tier 2 benefits.',
		],
	},
	{
		tier: 4,
		name: "VIP: Chika's Elite Fan",
		price: 500,
		icon: '👑',
		description: "Enjoy exclusive access reserved for Chika's most dedicated fans.",
		benefits: [
			'Activate a group chat with the bot for 6 months.',
			'VIP status: Access to private chats with the bot.',
			'Live support and priority responses to queries.',
			'Ability to submit feature requests and influence bot updates.',
			'2x EXP boost and faster level-ups (2x speed).',
			'Use the bot in any group or place, even if not currently active.',
			'Special recognition in bot communications as a VIP supporter.',
			'All Tier 1, Tier 2, and Tier 3 benefits.',
		],
	},
	{
		tier: 5,
		name: "Legendary: Chika's Ultimate Patron",
		price: 1000,
		icon: '🏆',
		description: "Join Chika's inner circle as a true hero of the waifu world!",
		benefits: [
			'Activate a group chat with the bot for 1 year.',
			'3x EXP boost and even faster level-ups (3x speed).',
			'Access to a private friends list feature with Chika.',
			'Direct influence on bot features and priority in feature rollouts.',
			'Personalized video shoutout from Chika, tailored to you.',
			'Extra perks such as early access to new bot capabilities, special event invites, and customizable bot interactions.',
			'Option to have Chika bot join and assist in your group events as a guest.',
			'All Tier 1, Tier 2, Tier 3, and Tier 4 benefits.',
		],
	},
];

let selectedPackage = packages[0];
function renderPackages() {
	const packageContainer = document.getElementById('packageContainer');
	if (!packageContainer) {
		console.error('Package container not found');
		return;
	}
	packageContainer.innerHTML = '';

	packages.forEach((pkg) => {
		const packageCard = document.createElement('div');
		packageCard.className = 'col';
		packageCard.innerHTML = `
		<div class="card h-100 glass-card" data-tier="${pkg.tier}">
			<div class="card-body">
				<div class="d-flex justify-content-between align-items-center mb-3">
					<span class="badge bg-secondary">Tier ${pkg.tier}</span>
					<span class="package-icon">${pkg.icon}</span>
				</div>
				<h5 class="card-title">${pkg.name}</h5>
				<h6 class="card-subtitle mb-2 text-warning">৳${pkg.price}</h6>
				<p class="card-text">${pkg.description}</p>
				<ul class="list-unstyled">
					${pkg.benefits
				.map(
					(benefit) => `
						<li class=" mb-2">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16">
								<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
			</svg>
							${benefit}
						</li>
					`
				)
				.join('')}
				</ul>
			</div>
			<div class="card-footer">
				<button class="btn btn-outline-light w-100 select-package">Select Package</button>
			</div>
		</div>
	`;
		packageContainer.appendChild(packageCard);
	});
};

function renderAdmins() {
	const teamMembers = [
		{
			name: "Yuki Tanaka",
			designation: "Lead Developer",
			image: "https://i.pravatar.cc/300?img=1",
			socialLinks: {
				facebook: "https://facebook.com/yukitanaka",
				github: "https://github.com/yukitanaka",
				email: "yuki@example.com",
				telegram: "https://t.me/yukitanaka"
			},
			bio: "Passionate about creating innovative bot experiences. Loves turning coffee into code and dreams into features."
		},
		{
			name: "Sakura Miyamoto",
			designation: "UI/UX Designer",
			image: "https://i.pravatar.cc/300?img=5",
			socialLinks: {
				facebook: "https://facebook.com/sakuramiyamoto",
				github: "https://github.com/sakuramiyamoto",
				email: "sakura@example.com"
			},
			bio: "Crafting intuitive and delightful interfaces. Believes in the power of design to enhance user experiences."
		},
		{
			name: "Hiroshi Nakamura",
			designation: "Community Manager",
			image: "https://i.pravatar.cc/300?img=7",
			socialLinks: {
				facebook: "https://facebook.com/hiroshinakamura",
				email: "hiroshi@example.com",
				telegram: "https://t.me/hiroshinakamura"
			},
			bio: "Building bridges between users and developers. Dedicated to fostering a vibrant and supportive community."
		},
		{
			name: "Aiko Yamada",
			designation: "Content Creator",
			image: "https://i.pravatar.cc/300?img=9",
			socialLinks: {
				facebook: "https://facebook.com/aikoyamada",
				github: "https://github.com/aikoyamada",
				email: "aiko@example.com"
			}
		}
	];

	const teamMembersContainer = $('#team-members');

	teamMembers.forEach(member => {
		const memberCard = `
            <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div class="team-member-card h-100">
                    <div class="member-image">
                        <img src="${member.image}" alt="${member.name}" class="img-fluid">
                        <div class="member-info">
                            <h5 class="mb-0">${member.name}</h5>
                            <p class="mb-0">${member.designation}</p>
                        </div>
                    </div>
                    <div class="p-3 d-flex flex-column justify-content-between">
                        <div>
                            ${member.bio ? `<p class="member-bio mb-3">${member.bio}</p>` : ''}
                            <div class="social-links text-center mb-3">
                                ${member.socialLinks.facebook ? `<a href="${member.socialLinks.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>` : ''}
                                ${member.socialLinks.github ? `<a href="${member.socialLinks.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                                ${member.socialLinks.email ? `<a href="mailto:${member.socialLinks.email}"><i class="fas fa-envelope"></i></a>` : ''}
                                ${member.socialLinks.telegram ? `<a href="${member.socialLinks.telegram}" target="_blank"><i class="fab fa-telegram-plane"></i></a>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
		teamMembersContainer.append(memberCard);
	});
}

function renderSupporters() {
	const supporters = [
		{
			name: "Kenji Sato",
			image: "https://i.pravatar.cc/300?img=11",
			packageName: "Legendary: Chika's Ultimate Patron",
			facebookLink: "https://facebook.com/kenjisato",
			tier: 6
		},
		{
			name: "Yumi Tanaka",
			image: "https://i.pravatar.cc/300?img=12",
			packageName: "VIP: Chika's Elite Fan",
			facebookLink: "https://facebook.com/yumitanaka",
			tier: 5
		},
		{
			name: "Akira Watanabe",
			image: "https://i.pravatar.cc/300?img=13",
			packageName: "Chika's Supreme Strategy",
			facebookLink: "https://facebook.com/akirawatanabe",
			tier: 4
		},
		{
			name: "Hana Yoshida",
			image: "https://i.pravatar.cc/300?img=14",
			packageName: "Chika's Secret Plan",
			facebookLink: "https://facebook.com/hanayoshida",
			tier: 3
		},
		{
			name: "Ryu Nakamura",
			image: "https://i.pravatar.cc/300?img=15",
			packageName: "Chika's Cheerful Support",
			facebookLink: "https://facebook.com/ryunakamura",
			tier: 2
		},
		{
			name: "Mei Kobayashi",
			image: "https://i.pravatar.cc/300?img=16",
			packageName: "Chika's Cheerful Support",
			facebookLink: "https://facebook.com/meikobayashi",
			tier: 1
		}
	];

	// Sort supporters by tier (highest to lowest)
	supporters.sort((a, b) => b.tier - a.tier);

	const supportersContainer = $('#supporters-container');

	supporters.forEach(supporter => {
		const supporterCard = `
            <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div class="team-member-card h-100">
                    <div class="member-image">
                        <img src="${supporter.image}" alt="${supporter.name}" class="img-fluid">
                        <div class="member-info">
                            <h5 class="mb-0">${supporter.name}</h5>
                            <p class="mb-0">${supporter.packageName}</p>
                        </div>
                    </div>
                    <div class="p-3 d-flex flex-column justify-content-between">
                        <div>
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="badge bg-primary">Tier ${supporter.tier}</span>
                                <a href="${supporter.facebookLink}" target="_blank" class="btn btn-outline-primary btn-sm">
                                    <i class="fab fa-facebook-f me-2"></i>Facebook
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
		supportersContainer.append(supporterCard);
	});
};

function updateSelectedPackage() {
	const nameElement = document.getElementById('selectedPackageName');
	const priceElement = document.getElementById('selectedPackagePrice');
	if (!nameElement || !priceElement) {
		console.error('Selected package elements not found');
		return;
	}
	nameElement.textContent = selectedPackage.name;
	priceElement.textContent = selectedPackage.price;
	document.querySelectorAll('.card').forEach((card) => card.classList.remove('selected'));
	const selectedCard = document.querySelector(`.card[data-tier="${selectedPackage.tier}"]`);
	if (selectedCard) {
		selectedCard.classList.add('selected');
	}
}

const saveToLocalStorage = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

const getFromLocalStorage = (key) => {
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : null;
};

// Page Loading and Navigation
const loadPage = async (page) => {
	try {
		const response = await fetch(`/pages/${page}`);
		const content = await response.text();
		document.getElementById('main-content').innerHTML = content;
		attachEventListeners();
		if (page === 'donate') {
			renderPackages();
			updateSelectedPackage();
		} else if (page == 'admins') {
			renderAdmins();
		} else if (page === 'supporter') {
			renderSupporters();
		}
	} catch (error) {
		document.getElementById('main-content').innerHTML = '<p>Failed to load page.</p>';
		console.error('Error loading page:', error);
	}
};

const setupPageLoader = () => {
	document.addEventListener('click', (event) => {
		const target = event.target.closest('[data-page]');
		if (!target) return;
		event.preventDefault();
		const page = target.getAttribute('data-page');
		if (!page) {
			console.error('Page attribute missing on element:', target);
			return;
		}
		loadPage(page);
		const pageId = page.split('.')[0];
		history.pushState({ page: pageId }, '', `#${pageId}`);
	});
};

const loadInitialPage = () => {
	const initialHash = window.location.hash.substring(1);
	const initialPage = initialHash || 'home';
	loadPage(initialPage);
	history.replaceState({ page: initialPage }, '', `#${initialPage}`);
};

// Event Listeners
const attachEventListeners = () => {
	const proceedDonation = document.getElementById('proceed-donation');
	const donationForm = document.getElementById('donationForm');

	if (proceedDonation) proceedDonation.addEventListener('click', handleProceedDonation);
	if (donationForm) donationForm.addEventListener('submit', handleDonationSubmit);
};

// Donation Submission Handler
const handleDonationSubmit = async (e) => {
	e.preventDefault();
	const uid = document.getElementById('uid').value.trim();
	const tid = document.getElementById('tid').value.trim();

	if (!uid || !tid) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Please enter both User ID and Thread ID."
		});
		return;
	}

	try {
		showLoading('Fetching user and thread data...');
		const userResponse = await axios.get(`/api/user/${uid}`);
		const threadResponse = await axios.get(`/api/thread/${tid}`);

		if (!threadResponse.data.data.isGroup) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "TID is not a valid group!"
			});
			return;
		}

		if (!threadResponse.data.isSubscribed) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Please add me in your group before proceeding!"
			});
			return;
		}

		if (userResponse.data.status === 'success' && threadResponse.data.status === 'success') {
			const userData = userResponse.data.data;
			const threadData = threadResponse.data.data;
			saveToLocalStorage('userData', userData);
			saveToLocalStorage('threadData', threadData);
			renderUserThreadInfo(userData, threadData);
		} else {
			throw new Error('User or Thread not found');
		}
	} catch (error) {
		alert('An error occurred while fetching data. Please check your User ID and Thread ID.');
		console.error('Error:', error);
	} finally {
		hideLoading();
	}
};

const renderUserThreadInfo = (userData, threadData) => {
	const packageContainer = document.getElementById('packageContainer');
	if (!packageContainer) {
		console.error('Package container not found');
		return;
	}

	packageContainer.innerHTML = `
        <div class="col-12">
            <div class="card mb-3">
                <div class="card-header bg-primary text-white">User Information</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="${userData.avatar}" class="rounded-circle mb-3" alt="${userData.name}" width="130px">
                        </div>
                        <div class="col-md-8">
                            <h5 class="card-title">${userData.name}</h5>
                            <p class="card-text">Username: ${userData.vanity}</p>
                            <p class="card-text">User ID: ${userData.userID}</p>
                            <p class="card-text">Exp: ${userData.exp}</p>
                            <p class="card-text">Money: ${userData.money}</p>
                            <p class="card-text">Last Active GC: ${userData.settings.last_active_gc}</p>
                            <p class="card-text">Token Time: ${new Date(userData.settings.token_time).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-header bg-success text-white">Thread Information</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="${threadData.imageSrc}" class="rounded-circle mb-3" alt="${threadData.threadName}" width="130px">
                        </div>
                        <div class="col-md-8">
                            <h5 class="card-title">${threadData.threadName}</h5>
                            <p class="card-text">Thread ID: ${threadData.threadID}</p>
                            <p class="card-text">Approval Mode: ${threadData.approvalMode ? 'Enabled' : 'Disabled'}</p>
                            <p class="card-text">Admins: ${threadData.adminIDs.length}</p>
                            <p class="card-text">Members: ${threadData.members.length}</p>
                            <p class="card-text">Updated At: ${new Date(threadData.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <button id="confirmProceed" class="btn btn-success btn-lg">Confirm and Proceed</button>
            </div>
        </div>
    `;

	const confirmProceedButton = document.getElementById('confirmProceed');
	if (confirmProceedButton) {
		confirmProceedButton.addEventListener('click', handleProceedDonation);
	}
};

const handleProceedDonation = () => {
	showLoading('Payment is processing, please complete the payment in the opened window.');
	$.ajax({
		url: '/bkash/create-payment',
		method: 'POST',
		data: {
			amount: $('#selectedPackagePrice').text(),
			uid: $('#uid').val(),
			tid: $('#tid').val(),
		},
		success: function (response) {
			if (response.bkashURL) {
				const paymentPopup = window.open(response.bkashURL, 'bKash Payment', 'width=500,height=600');
				// Listen for messages from the popup window
				window.addEventListener(
					'message',
					function (event) {
						if (event.origin === window.location.origin) {
							const paymentStatus = event.data;
							handlePaymentResponse(paymentStatus);
							if (paymentPopup) paymentPopup.close();
						}
					},
					false
				);
			} else {
				hideLoading();
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong while creating the payment!',
				});
			}
		},
		error: function () {
			hideLoading();
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Failed to initiate payment. Please try again.',
			});
		},
	});
};

const handlePaymentMessage = (event) => {
	if (event.origin === window.location.origin) {
		const paymentStatus = event.data;
		handlePaymentResponse(paymentStatus);
		if (event.source) event.source.close();
	}
};

const handlePaymentResponse = (paymentStatus) => {
	hideLoading();
	if (paymentStatus.status === 'success') {
		const userData = getFromLocalStorage('userData');
		const threadData = getFromLocalStorage('threadData');
		if (userData && threadData) {
			const paymentInfo = {
				transactionId: paymentStatus.trxID,
				amount: selectedPackage.price,
				packageName: selectedPackage.name,
				date: new Date(),
			};
			renderThankYouMessage(userData, threadData, paymentInfo);
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Data Error',
				text: 'User or Thread data not found. Please try again.',
			});
		}
	} else if (paymentStatus.status === 'cancel') {
		Swal.fire({
			icon: 'info',
			title: 'Payment Cancelled',
			text: 'Payment was cancelled by the user.',
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: 'Payment Failed',
			text: 'Something went wrong during the payment process.',
		});
	}
};

const renderThankYouMessage = (userData, threadData, paymentInfo) => {
	const packageContainer = document.getElementById('packageContainer');
	if (!packageContainer) {
		console.error('Package container not found');
		return;
	}

	packageContainer.innerHTML = `
        <div class="col-12">
            <div class="card mb-4 border-0 shadow-lg">
                <div class="card-body text-center">
                    <img src="/assets/images/chika-thank-you.png" alt="Chika Thank You" class="img-fluid mb-4" style="max-width: 200px;">
                    <h2 class="card-title mb-4 text-primary">Thank You for Your Support!</h2>
                    <p class="card-text lead mb-4">Your subscription has been successfully processed. Chika is excited to join your group!</p>
                    <div class="alert alert-success" role="alert">
                        You can now use Chika Bot in your group. Thank you for helping keep the Chika Bot project alive!
                    </div>
                </div>
            </div>

            <div class="row g-4">
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow">
                        <div class="card-header bg-primary text-white">
                            <h5 class="mb-0">User Information</h5>
                        </div>
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <img src="${userData.avatar}" class="rounded-circle" alt="${userData.name}" width="100px">
                            </div>
                            <h6 class="card-title">${userData.name}</h6>
                            <p class="card-text">Username: ${userData.vanity}</p>
                            <p class="card-text">User ID: ${userData.userID}</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow">
                        <div class="card-header bg-success text-white">
                            <h5 class="mb-0">Thread Information</h5>
                        </div>
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <img src="${threadData.imageSrc}" class="rounded-circle" alt="${threadData.threadName}" width="100px">
                            </div>
                            <h6 class="card-title">${threadData.threadName}</h6>
                            <p class="card-text">Thread ID: ${threadData.threadID}</p>
                            <p class="card-text">Members: ${threadData.members.length}</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow">
                        <div class="card-header bg-info text-white">
                            <h5 class="mb-0">Payment Information</h5>
                        </div>
                        <div class="card-body">
                            <h6 class="card-title">Transaction ID: ${paymentInfo.transactionId}</h6>
                            <p class="card-text">Amount: ৳${paymentInfo.amount}</p>
                            <p class="card-text">Package: ${paymentInfo.packageName}</p>
                            <p class="card-text">Date: ${paymentInfo.date.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center mt-4">
                <button class="btn btn-lg btn-primary" onclick="window.location.href='/'">Return to Home</button>
            </div>
        </div>
    `;
};

const showLoading = (message) => {
	const loadingOverlay = document.createElement('div');
	loadingOverlay.id = 'loadingOverlay';
	loadingOverlay.innerHTML = `
        <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-light">${message}</p>
    `;
	loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
	document.body.appendChild(loadingOverlay);
};

const hideLoading = () => {
	const loadingOverlay = document.getElementById('loadingOverlay');
	if (loadingOverlay) {
		loadingOverlay.remove();
	}
};

// Main Execution
document.addEventListener('DOMContentLoaded', () => {
	setupPageLoader();
	loadInitialPage();
	attachEventListeners();

	const navLinks = document.querySelectorAll('.nav-link');
	const setActiveLink = () => {
		const currentHash = window.location.hash;
		navLinks.forEach((link) => {
			link.classList.toggle('is-active', link.getAttribute('href') === currentHash);
		});
	};

	window.addEventListener('hashchange', setActiveLink);
	setActiveLink();

	$('.nav-link').click(function () {
		$('.nav-link').removeClass('is-active');
		$(this).addClass('is-active');
	});

	const menuBars = $('.menu-bars');
	const leftSideMenu = $('.left-side');
	menuBars.click(function (e) {
		e.stopPropagation();
		$('body').toggleClass('menu-shown');
		leftSideMenu.toggleClass('shown');
	});

	$(document).click(function (e) {
		if (!$(e.target).closest('.left-side, .menu-bars').length) {
			$('body').removeClass('menu-shown');
			leftSideMenu.removeClass('shown');
		}
	});

	document.querySelector('.dark-light').addEventListener('click', () => {
		document.body.classList.toggle('light-mode');
	});

	document.addEventListener('click', function (e) {
		if (e.target.classList.contains('select-package')) {
			const tier = parseInt(e.target.closest('.card').dataset.tier);
			selectedPackage = packages.find((pkg) => pkg.tier === tier);
			updateSelectedPackage();
		}
	});

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('/assets/js/service-worker.js')
			.then((registration) => console.log('Service Worker registered:', registration))
			.catch((error) => console.error('Service Worker registration failed:', error));
	}

	const updateCacheButton = document.getElementById('update-cache');
	if (updateCacheButton) {
		updateCacheButton.addEventListener('click', async () => {
			console.log('Update Cache button clicked');
			if ('serviceWorker' in navigator) {
				try {
					const registration = await navigator.serviceWorker.ready;
					console.log(registration);
					if (registration.active) {
						registration.active.postMessage({ action: 'updateCache' });
						showToast('Cache updated successfully!');
						setTimeout(() => location.reload(), 3000);
					} else {
						console.error('No active Service Worker found.');
					}
				} catch (error) {
					console.error('Failed to get Service Worker ready:', error);
				}
			} else {
				console.error('Service Worker not supported.');
			}
		});
	}
});