const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

/* vvvvvvvvvvvv[CẤU HÌNH NỘI DUNG]vvvvvvvvvvvvvv */
const config = {
	"email": "email_cua_ban@gmail.com",
	"pass": "mat_khau_cua_ban",
	"post":`Hello World!`,
	"delay": 10000,
	"groups": [
		{
			"id": "658667010971295",
			"name": "Trí Tuệ Nhân Tạo"
		},
		{
			"id": "536128150603165",
			"name": "MQL5 Tiếng Việt"
		}
	]
};
/* ^^^^^^^^^^^^^[CẤU HÌNH NỘI DUNG]^^^^^^^^^^^^^ */

/* vvvvvvvvvvvv[CẤU HÌNH HTML]vvvvvvvvvvvvvv */
const login_link = 'https://mbasic.facebook.com/login';
const fb_gr_pre_link = 'https://mbasic.facebook.com/groups/';

/* ^^^^^^^^^^^^[CẤU HÌNH HTML]^^^^^^^^^^^^^^ */

/* vvvvvvvvvvvv[KHỞI TẠO TRÌNH DUYỆT]vvvvvvvvvvvvvv */
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
const driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
/* ^^^^^^^^^^^^^[KHỞI TẠO TRÌNH DUYỆT]^^^^^^^^^^^^^ */


(async function example() { // Khởi tạo quá trình bất đồng bộ
	try {
		/*  */
		/* vvvvvvvvvvvvv[XỬ LÝ ĐĂNG NHẬP]vvvvvvvvvvvvv */
		await visit(login_link);	// Mở trang đăng nhập
		const emailInput = await findByName('email');	// tìm vị trí nhập email
		const passInput = await findByName('pass');	// tìm vị trí nhập password
		const loginButton = await findByName('login');	// tìm vị trí nút login
		await write(emailInput,config.email);	//Điền email
		await write(passInput,config.pass);	// Điền password
		await loginButton.click(); // Nhấp đăng nhập
		/* ^^^^^^^^^^^^^^[XỬ LÝ ĐĂNG NHẬP]^^^^^^^^^^^^ */
		
		/* vvvvvvvvvvvvv[XỬ LÝ ĐĂNG BÀI]vvvvvvvvvvvvv */
		await driver.wait(until.titleIs('Facebook'), 2000); // Đợi đến khi đăng nhập thành công, Title trang web sẽ chuyển thành "Facebook"
		for (let i = 0; i < config.groups.length; i++) {	// Lặp hết danh sách group
			let group = config.groups[i];	// Lấy riêng group khỏi danh sách
			await visit(fb_gr_pre_link+group.id);	// Chuyển đến trang group
			const messageInput = await findByName('xc_message');	// Tìm vị trí nhập post
			const postButton = await findByName('view_post');	// Tìm vị trí nút đăng bài
			await write(messageInput,config.post);	// Điền nội dung post
			await postButton.click();	// Nhấp đăng bài
			await driver.sleep(config.delay);	// Đợi 5 giây
		};
		/* ^^^^^^^^^^^^^[XỬ LÝ ĐĂNG BÀI]^^^^^^^^^^^^^ */
		
	} finally {
		quit();	// Thoát trình duyệt 
	}
})();



/* 	Thư viện các hàm hỗ trợ 
	Nguồn ham khảo tại: https://viblo.asia/p/selenium-webdriver-va-nodejs-vyDZO7JxZwj
*/

// visit a webpage
async function visit(theUrl) {
	return await driver.get(theUrl);
};

// quit current session
async function quit() {
return await driver.quit();
};

// wait and find a specific element with it's id
async function findById(id) {
await driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
return await driver.findElement(By.id(id));
};

// wait and find a specific element with it's name
async function findByName(name) {
await driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
return await driver.findElement(By.name(name));
};

// fill input web elements
async function write(el, txt) {
return await el.sendKeys(txt);
};
