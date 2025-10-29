const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export const khachHangAPI = {
  search: async (params: {
    keyword?: string;
    tuoiTu?: number;
    tuoiDen?: number;
    gioiTinh?: string;
    page?: number;
    pageSize?: number;
  }) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && String(value) !== '') {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const response = await fetch(`${API_BASE_URL}/khachhang?${queryString}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/khachhang/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  create: async (data: FormData) => {
    const response = await fetch(`${API_BASE_URL}/khachhang`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: data,
    });
    return response.json();
  },

  update: async (id: number, data: FormData) => {
    const response = await fetch(`${API_BASE_URL}/khachhang/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: data,
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/khachhang/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  thongKe: async () => {
    const response = await fetch(`${API_BASE_URL}/khachhang/thongke`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

export const phieuKhamSangLocAPI = {
  search: async (params: {
    maKH?: number;
    maNV?: number;
    trangThai?: string;
    duDieuKien?: boolean;
    page?: number;
    pageSize?: number;
  }) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && String(value) !== '') {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const response = await fetch(`${API_BASE_URL}/phieukhamsangloc?${queryString}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/phieukhamsangloc/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  create: async (data: FormData) => {
    const response = await fetch(`${API_BASE_URL}/phieukhamsangloc`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: data,
    });
    return response.json();
  },

  update: async (id: number, data: FormData) => {
    const response = await fetch(`${API_BASE_URL}/phieukhamsangloc/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: data,
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/phieukhamsangloc/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

export const phieuTiemAPI = {
  search: async (params: {
    maVaccine?: number;
    maNV?: number;
    maPhieuKham?: number;
    daThanhToan?: boolean;
    coPhanUng?: boolean;
    page?: number;
    pageSize?: number;
  }) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && String(value) !== '') {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const response = await fetch(`${API_BASE_URL}/phieutiem?${queryString}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/phieutiem/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  create: async (data: FormData) => {
    const response = await fetch(`${API_BASE_URL}/phieutiem`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: data,
    });
    return response.json();
  },

  update: async (id: number, data: FormData) => {
    const response = await fetch(`${API_BASE_URL}/phieutiem/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: data,
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/phieutiem/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

export const vaccineAPI = {
  search: async (params: {
    keyword?: string;
    page?: number;
    pageSize?: number;
  }) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && String(value) !== '') {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const response = await fetch(`${API_BASE_URL}/vaccine?${queryString}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/vaccine/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  create: async (params: {
    Ten: string;
    SoLuong: number;
    DonGia: number;
    MoTa?: string;
    GhiChu?: string;
    MaLoai: number;
    DonVi: string;
    DoTuoi: string;
  }) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && String(value) !== '') {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const response = await fetch(`${API_BASE_URL}/vaccine?${queryString}`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  update: async (id: number, params: {
    Ten: string;
    SoLuong: number;
    DonGia: number;
    MoTa?: string;
    GhiChu?: string;
    MaLoai: number;
    DonVi: string;
    DoTuoi: string;
  }) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && String(value) !== '') {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const response = await fetch(`${API_BASE_URL}/vaccine/${id}?${queryString}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/vaccine/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

export const thanhToanAPI = {
  search: async (params: {
    tongTienTu?: number;
    tongTienDen?: number;
    maPhieuTiem?: number;
    maPTTT?: number;
    maKHTT?: number;
    page?: number;
    pageSize?: number;
  }) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && String(value) !== '') {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const response = await fetch(`${API_BASE_URL}/thanhtoan?${queryString}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/thanhtoan/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  create: async (data: FormData) => {
    const response = await fetch(`${API_BASE_URL}/thanhtoan`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: data,
    });
    return response.json();
  },

  update: async (id: number, data: FormData) => {
    const response = await fetch(`${API_BASE_URL}/thanhtoan/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: data,
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/thanhtoan/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

export const loVaccineAPI = {
  search: async (params: {
    keyword?: string;
    ngayTaoTu?: string;
    ngayTaoDen?: string;
    page?: number;
    pageSize?: number;
  }) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && String(value) !== '') {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const response = await fetch(`${API_BASE_URL}/lo?${queryString}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/lo/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  create: async (data: FormData) => {
    const response = await fetch(`${API_BASE_URL}/lo`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: data,
    });
    return response.json();
  },

  update: async (id: number, data: FormData) => {
    const response = await fetch(`${API_BASE_URL}/lo/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: data,
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/lo/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  nhapVaccine: async (data: FormData) => {
    const response = await fetch(`${API_BASE_URL}/lo/nhap-vaccine`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: data,
    });
    return response.json();
  },
};

export const nhanVienAPI = {
  search: async (params: {
    keyword?: string;
    vaiTro?: string;
    luongTu?: number;
    luongDen?: number;
    page?: number;
    pageSize?: number;
  }) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && String(value) !== '') {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const response = await fetch(`${API_BASE_URL}/nhanvien?${queryString}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/nhanvien/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  create: async (data: FormData) => {
    const response = await fetch(`${API_BASE_URL}/nhanvien`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: data,
    });
    return response.json();
  },

  update: async (id: number, data: FormData) => {
    const response = await fetch(`${API_BASE_URL}/nhanvien/${id}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: data,
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/nhanvien/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};
