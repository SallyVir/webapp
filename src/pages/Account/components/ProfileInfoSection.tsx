import { useState } from 'react';
import type { User } from '../../../types/user';

export default function ProfileInfoSection({
                                               user,
                                               onSaveProfile
                                           }: {
    user: User;
    onSaveProfile: (name: string) => Promise<void>;
}) {
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('Khác');
    const [dob, setDob] = useState({ day: '', month: '', year: '' });
    const [address, setAddress] = useState('');
    const [msg, setMsg] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        await onSaveProfile(name.trim() || user.name);
        setSaving(false);
        setMsg('Cập nhật thông tin tài khoản thành công!');
        setTimeout(() => setMsg(''), 3000);
    };

    return (
        <>
            <h4 className="text-uppercase fw-normal text-dark mb-4">THÔNG TIN TÀI KHOẢN</h4>
            {msg && <div className="alert alert-success py-2 mb-4">{msg}</div>}

            <form onSubmit={handleSubmit}>
                <div className="row mb-4 align-items-center">
                    <label className="col-sm-3 col-form-label text-muted">Tên hiển thị</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control rounded-1 py-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-4 align-items-center">
                    <label className="col-sm-3 col-form-label text-muted">Số điện thoại</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control rounded-1 py-2"
                            placeholder="Nhập số điện thoại của bạn"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row mb-4 align-items-center">
                    <label className="col-sm-3 col-form-label text-muted">Giới tính</label>
                    <div className="col-sm-9">
                        <select
                            className="form-select rounded-1 py-2"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="Khác">Khác</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-4 align-items-center">
                    <label className="col-sm-3 col-form-label text-muted">Ngày sinh</label>
                    <div className="col-sm-9">
                        <div className="row g-3">
                            <div className="col-4">
                                <select
                                    className="form-select rounded-1 py-2"
                                    value={dob.day}
                                    onChange={(e) => setDob({ ...dob, day: e.target.value })}
                                >
                                    <option value="">Ngày</option>
                                    {[...Array(31)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-4">
                                <select
                                    className="form-select rounded-1 py-2"
                                    value={dob.month}
                                    onChange={(e) => setDob({ ...dob, month: e.target.value })}
                                >
                                    <option value="">Tháng</option>
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-4">
                                <select
                                    className="form-select rounded-1 py-2"
                                    value={dob.year}
                                    onChange={(e) => setDob({ ...dob, year: e.target.value })}
                                >
                                    <option value="">Năm</option>
                                    {[...Array(80)].map((_, i) => (
                                        <option key={i} value={2026 - i}>{2026 - i}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4 align-items-center">
                    <label className="col-sm-3 col-form-label text-muted">Địa chỉ</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control rounded-1 py-2"
                            placeholder="Nhập địa chỉ của bạn"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>

                <div className="text-end mt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="btn text-white fw-bold px-4 py-2"
                        style={{ backgroundColor: '#e31818', borderRadius: '6px' }}
                    >
                        {saving ? 'Đang lưu...' : 'Cập nhật'}
                    </button>
                </div>
            </form>
        </>
    );
}