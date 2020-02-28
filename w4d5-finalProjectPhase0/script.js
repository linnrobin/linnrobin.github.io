//global
var arrayTotalPesanan = [];
var objectPesanan = {};
var arrayTotalPesananBarang = [];
var objectPesananBarang = {};
var arrayTotalStok = [];
var objectStok = {};
var arrayTotalCustomer = [];
var objectCustomer = {};
var arrayTotalBarang = [];
var objectBarang = {};
var totalBarang = 0;
var totalAllJenisBarang = 0;
var totalAllCustomer = 0;
var totalAllPesanan = 0;
var totalAllPembelian = 0;

// untuk menambah customer
var tambahCustomerForm = document.getElementById("tambah-customer-form");
tambahCustomerForm.addEventListener("submit", insertCustomer);

function insertCustomer() {
    //menambah customer
    var namaCustomer = document.getElementById("nama-customer").value;
    var createh5 = document.createElement('h5');
    var texth5 = document.createTextNode(namaCustomer);
    var customerList = document.getElementById("customer-list");

    //memunculkan customer di combobox pesanan
    var createOption = document.createElement('Option');
    var attrValue = document.createAttribute('value');
    attrValue.value = namaCustomer;
    var textOption = document.createTextNode(namaCustomer);
    var tambahPesananNama = document.getElementById("tambah-pesanan-nama");

    //cek nama customer sudah ada belum
    var namaSama = false;
   
    if (namaCustomer === '') {
        alert('Nama Customer Belum Diisi');
    } else {
        for ( let i = 0; i < totalAllCustomer; i++) {
            if (arrayTotalCustomer[i].nama === namaCustomer) {
                namaSama = true;
            }
        } 

        if (namaSama === true) {
            alert('Nama Customer Sudah ada');
            namaSama = false;
        } else {
                //menambah customer
                alert(`Tambah Customer ${namaCustomer.toUpperCase()} Berhasil`);
                createh5.appendChild(texth5);
                customerList.appendChild(createh5);
                document.getElementById("nama-customer").value = '';
    
                //memunculkan customer di combobox pesanan
                createOption.appendChild(textOption);
                createOption.setAttributeNode(attrValue);
                tambahPesananNama.appendChild(createOption);
    
                //simpan customer ke array of oject
                objectCustomer.nama = namaCustomer;
                arrayTotalCustomer.push(objectCustomer);
                objectCustomer= {};
    
                //count total customer dan munculkan di judul
                totalAllCustomer++;
                document.getElementById("count-customer").innerHTML = totalAllCustomer;
        }
            
    }
    return;
}

//untuk menambah barang
var tambahBarangForm = document.getElementById("tambah-barang-form");
tambahBarangForm.addEventListener("submit",insertBarang);

function insertBarang() {
    //menambah barang
    var namaBarang = document.getElementById("nama-barang").value;
    var hargaBarang = document.getElementById("harga-barang").value;
    var createh5 = document.createElement('h5');
    if (hargaBarang === '') hargaBarang = 0;
    var texth5 = document.createTextNode(namaBarang + '\t' + RPcurrencyFormat(hargaBarang));
    var listBarang = document.getElementById("barang-list");

    //memunculkan barang di combobox pesanan
    var createOption = document.createElement('option');
    var attrValue = document.createAttribute('value');
    attrValue.value = namaBarang+','+hargaBarang;
    var textOption = document.createTextNode(namaBarang);
    var tambahPesananBarang = document.getElementById("tambah-pesanan-barang");

    //memunculkan barang di combobox pembelian
    var createOption2 = document.createElement('option');
    var attrValue2 = document.createAttribute('value');
    attrValue2.value = namaBarang+','+hargaBarang;
    var textOption2 = document.createTextNode(namaBarang);

    var tambahPembelianBarang = document.getElementById("tambah-pembelian-barang");

    //cek nama barang sudah ada belum
    var jenisBarangSama = false;

    //menambah barang
    if (namaBarang === '') {
        alert('Barang Belum Diisi');
    } else {
        for ( let i = 0; i < totalAllJenisBarang; i++) {
            if (arrayTotalBarang[i].nama === namaBarang) {
                jenisBarangSama = true;
            }
        } 

        if (jenisBarangSama === true) {
            alert('Barang Sudah ada');
            jenisBarangSama = false;
        } else {
            alert(`Tambah Barang ${namaBarang.toUpperCase()} dengan harga ${hargaBarang} Berhasil`);
            createh5.appendChild(texth5);
            listBarang.appendChild(createh5);
            document.getElementById("nama-barang").value = '';
            document.getElementById("harga-barang").value = '';

            
            //memunculkan barang di combobox pesanan
            createOption.appendChild(textOption);
            createOption.setAttributeNode(attrValue);
            tambahPesananBarang.appendChild(createOption);

            //memunculkan barang di combobox pembelian
            createOption2.appendChild(textOption2);
            createOption2.setAttributeNode(attrValue2);
            tambahPembelianBarang.appendChild(createOption2);

            //simpan barang ke array of oject
            objectBarang.nama = namaBarang;
            objectBarang.satuan = hargaBarang;
            arrayTotalBarang.push(objectBarang);
            objectBarang= {};
            console.log(arrayTotalBarang)
            //count total barang dan munculkan di judul
            totalAllJenisBarang++;
            document.getElementById("count-jenis-barang").innerHTML = totalAllJenisBarang;
        }
    }
    return;
}

//menambah baris barang
var tambahBarisBarang = document.getElementById("tambah-baris-barang");
var counter = 0;
tambahBarisBarang.addEventListener("click", function() {
    var createSelect = document.createElement('select')
    var attrId = document.createAttribute('id');
    attrId.value = 'tambah-pesanan-barang-' + counter;
    
});


//untuk menambahkan pesanan
var tambahPesananForm = document.getElementById("tambah-pesanan-form");
tambahPesananForm.addEventListener("submit",insertPesanan);

function insertPesanan() {
    //menambah nama customer di pesanan
    var namaCustomer = document.getElementById("tambah-pesanan-nama").value;
    var createh4 = document.createElement('h4');
    var texth4 = document.createTextNode(namaCustomer);

    var listPesanan = document.getElementById("list-pesanan");

    //menambah nama, harga, dan jumlah barang di pesanan
    const valueBarang = document.getElementById("tambah-pesanan-barang").value;
    var splitValueBarang = valueBarang.split(",");
    var namaBarang = splitValueBarang[0];
    var hargaBarang = splitValueBarang[1];
    var jumlahBarang = document.getElementById("jumlah-barang").value;
    if (jumlahBarang === '') jumlahBarang = 1;
    var createh6 = document.createElement('h6');
    var texth6 = document.createTextNode(jumlahBarang + 'x   '+ namaBarang + ' = ' + RPcurrencyFormat(jumlahBarang * Number(hargaBarang)));

    var h6 = document.getElementsByTagName('h6');

    

    if (namaCustomer === '' ) {
        alert('Nama Customer Belum Diisi');
    } else if ( namaBarang === '') {
        alert('Nama Barang Belum Diisi');
    } else {
        //menambah nama customer di pesanan
        alert(`Tambah Pesanan ${namaCustomer.toUpperCase()} Berhasil`);
        createh4.appendChild(texth4);
        listPesanan.appendChild(createh4);
        createh6.appendChild(texth6);
        listPesanan.appendChild(createh6);
        document.getElementById("jumlah-barang").value = '';   

        //simpan pesanan ke array of oject
        objectPesanan.pemesan = namaCustomer;
        objectPesananBarang.nama = namaBarang;
        objectPesananBarang.satuan = hargaBarang;
        objectPesananBarang.jumlah = Number(jumlahBarang);
        objectPesananBarang.total = jumlahBarang * hargaBarang;
        arrayTotalPesananBarang.push(objectPesananBarang);
        objectPesanan.barang = arrayTotalPesananBarang;
        arrayTotalPesanan.push(objectPesanan);
        objectPesanan = {};
        arrayTotalPesananBarang = [];
        objectPesananBarang = {};

        //count total customer dan munculkan di judul
        totalAllPesanan++;
        document.getElementById("count-pesanan").innerHTML = totalAllPesanan;
    }

    rekapStok(h6);

    return;
}

//untuk menambahkan pembelian
var tambahPembelianForm = document.getElementById("tambah-pembelian-form");
tambahPembelianForm.addEventListener("submit",insertPembelian);

function insertPembelian() {

    var listPembelian = document.getElementById("list-pembelian");

    const valueBarang = document.getElementById("tambah-pembelian-barang").value;
    var splitValueBarang = valueBarang.split(",");
    var namaBarang = splitValueBarang[0];
    var hargaBarang = splitValueBarang[1];
    var stokBarang = document.getElementById("stok-barang").value;
    if (stokBarang === '') stokBarang = 1;
    var createh5 = document.createElement('h5');
    var texth5 = document.createTextNode(stokBarang + 'x   '+ namaBarang);
    
    var h6 = document.getElementsByTagName('h6');


    if ( namaBarang === '') {
        alert('Nama Barang Belum Diisi');
    } else {
        //menambah nama barang di pembelian
        alert(`Tambah Pembelian Berhasil`);
        createh5.appendChild(texth5);
        listPembelian.appendChild(createh5);
        document.getElementById("stok-barang").value = '';    
        
        //simpan pembelian ke array of oject
        objectStok.nama = namaBarang;
        objectStok.masuk = stokBarang;
        totalBarang += Number(stokBarang);
        objectStok.total = totalBarang;
        arrayTotalStok.push(objectStok);
        objectStok = {};


        //count total pembelian dan munculkan di judul
        totalAllPembelian++;
        document.getElementById("count-pembelian").innerHTML = totalAllPembelian;
    }

    rekapStok(h6);
    
    return;
}

function rekapStok(tag) {
    for (let i = 0; i < arrayTotalPesanan.length; i++) {
        for ( let j = 0; j < arrayTotalPesanan.length; j++) {
            console.log(arrayTotalStok[i].total +'>='+ arrayTotalPesanan[j].barang[0].jumlah);
            if (arrayTotalStok[i].total >= arrayTotalPesanan[j].barang[0].jumlah) {
                tag[j].style.backgroundColor = "LightGreen";
            }
        }
    }
}

function RPcurrencyFormat(anyNumber) {

	let result = '';
	let numberStr = anyNumber + '';
	let strBaru = '';
	let sisa = numberStr.length % 3;
	let counter = 0;
	
	for (let i = 0; i < numberStr.length ; i++) {	
		strBaru += numberStr[i];	
		if (i < sisa) {
			if (i === sisa-1 && i !== numberStr.length-1) {
				strBaru += '.';
			}
		} else {
			counter++;
			if (counter % 3 === 0 && i !== numberStr.length-1 ) {
				strBaru += '.';
			}
		}
	}

	result = 'RP ' + strBaru;
	
	return result;
}