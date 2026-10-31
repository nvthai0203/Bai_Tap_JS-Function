// Quản lý tuyển sinh
function diemUuTienKhuVuc(khuVuc) {
    if (khuVuc === "A") return 2;
    if (khuVuc === "B") return 1;
    if (khuVuc === "C") return 0.5;
    return 0;
}

function diemUuTienDoiTuong(doiTuong) {
    if (doiTuong === 1) return 2.5;
    if (doiTuong === 2) return 1.5;
    if (doiTuong === 3) return 1;
    return 0;
}

function xetTuyen(diemChuan, mon1, mon2, mon3, khuVuc, doiTuong) {
    if (mon1 === 0 || mon2 === 0 || mon3 === 0) {
        return { dau: false, tongDiem: mon1 + mon2 + mon3, lyDo: "Có môn bị điểm 0" };
    }

    const tongDiem = mon1 + mon2 + mon3 + diemUuTienKhuVuc(khuVuc) + diemUuTienDoiTuong(doiTuong);
    return {
        dau: tongDiem >= diemChuan,
        tongDiem,
        lyDo: tongDiem >= diemChuan ? "Đủ điểm chuẩn" : "Không đủ điểm chuẩn",
    };
}

document.getElementById("formTuyenSinh").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const ketQua = xetTuyen(
        Number(form.diemChuan.value),
        Number(form.mon1.value),
        Number(form.mon2.value),
        Number(form.mon3.value),
        form.khuVuc.value,
        Number(form.doiTuong.value)
    );

    document.getElementById("ketQuaTuyenSinh").textContent =
        `Tổng điểm: ${ketQua.tongDiem}. Kết quả: ${ketQua.dau ? "ĐẬU" : "RỚT"} (${ketQua.lyDo}).`;
});
//======================================================================================================

// Tính tiền điện
function tinhTienDien(soKw) {
    const bac = [
        { gioiHan: 50, donGia: 500 },
        { gioiHan: 50, donGia: 650 },
        { gioiHan: 100, donGia: 850 },
        { gioiHan: 150, donGia: 1100 },
        { gioiHan: Infinity, donGia: 1300 },
    ];

    let conLai = soKw;
    let tongTien = 0;

    for (const muc of bac) {
        if (conLai <= 0) break;
        const soTinh = Math.min(conLai, muc.gioiHan);
        tongTien += soTinh * muc.donGia;
        conLai -= soTinh;
    }

    return tongTien;
}

document.getElementById("formTienDien").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const hoTen = form.hoTen.value.trim();
    const soKw = Number(form.soKw.value);
    const tien = tinhTienDien(soKw);

    document.getElementById("ketQuaTienDien").textContent =
        `Khách hàng ${hoTen} dùng ${soKw} kWh, tiền điện: ${tien.toLocaleString("vi-VN")} VNĐ.`;
});
//======================================================================================================

// Tính thuế thu nhập cá nhân
function tinhThueTNCN(thuNhapNam, soNguoiPhuThuoc) {
    const thuNhapChiuThue = thuNhapNam - 4e6 - soNguoiPhuThuoc * 1.6e6;
    if (thuNhapChiuThue <= 0) return 0;

    const bacThue = [
        { den: 60e6, thueSuat: 0.05 },
        { den: 120e6, thueSuat: 0.1 },
        { den: 210e6, thueSuat: 0.15 },
        { den: 384e6, thueSuat: 0.2 },
        { den: 624e6, thueSuat: 0.25 },
        { den: 960e6, thueSuat: 0.3 },
        { den: Infinity, thueSuat: 0.35 },
    ];

    let thue = 0;
    let mocTruoc = 0;

    for (const bac of bacThue) {
        if (thuNhapChiuThue <= mocTruoc) break;
        const phanTinh = Math.min(thuNhapChiuThue, bac.den) - mocTruoc;
        thue += phanTinh * bac.thueSuat;
        mocTruoc = bac.den;
    }

    return thue;
}

document.getElementById("formThue").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const hoTen = form.hoTen.value.trim();
    const thue = tinhThueTNCN(Number(form.thuNhapNam.value), Number(form.soNguoiPhuThuoc.value));

    document.getElementById("ketQuaThue").textContent =
        `Họ tên: ${hoTen}. Thuế thu nhập cá nhân: ${thue.toLocaleString("vi-VN")} VNĐ.`;
});
//======================================================================================================

// Tính tiền cáp
function tinhTienCap(loaiKH, soKetNoi, soKenhCaoCap) {
    if (loaiKH === "nhaDan") {
        return 4.5 + 20.5 + soKenhCaoCap * 7.5;
    }

    const phiDichVu = soKetNoi <= 10 ? 75 : 75 + (soKetNoi - 10) * 5;
    return 15 + phiDichVu + soKenhCaoCap * 50;
}

const loaiKH = document.getElementById("loaiKH");
const wrapSoKetNoi = document.getElementById("wrapSoKetNoi");

loaiKH.addEventListener("change", () => {
    wrapSoKetNoi.classList.toggle("hidden", loaiKH.value !== "doanhNghiep");
});

document.getElementById("formTienCap").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const soKetNoi = form.loaiKH.value === "doanhNghiep" ? Number(form.soKetNoi.value) : 0;
    const tien = tinhTienCap(form.loaiKH.value, soKetNoi, Number(form.soKenhCaoCap.value));

    document.getElementById("ketQuaTienCap").textContent =
        `Mã KH ${form.maKH.value}: ${tien.toLocaleString("en-US", { style: "currency", currency: "USD" })}.`;
});
//======================================================================================================
