import { useState } from 'react';
import type { User } from '../../types/user';
import { userService } from '../../services/userService';
import AccountSidebar from './components/AccountSidebar';
import ProfileInfoSection from './components/ProfileInfoSection';

// Dữ liệu tạm để hiển thị khi chưa có dữ liệu user trong localStorage
const DEMO_USER: User = {
    id: '98023',
    name: 'Thanh Trần Ân Thanh',
    avatar: null,
    re_login_code: null,
    session_expires_at: null
};

export default function AccountPage() {
    const [user, setUser] = useState<User>(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : DEMO_USER;
    });

    const [activeTab, setActiveTab] = useState('profile');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pwdMsg, setPwdMsg] = useState('');

    const handleChangeInfo = async (newName: string, newAvatar: string) => {
        try {
            await userService.changeInfo(Number(user.id), newName, newAvatar);
        } catch {
        }
        const updated: User = { ...user, name: newName, avatar: newAvatar || null };
        setUser(updated);
        localStorage.setItem('user', JSON.stringify(updated));
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPwdMsg('Mật khẩu nhập lại không khớp!');
            return;
        }
        try {
            await userService.changePassword(Number(user.id), newPassword);
        } catch {

        }
        setNewPassword('');
        setConfirmPassword('');
        setPwdMsg('Đổi mật khẩu thành công!');
        setTimeout(() => setPwdMsg(''), 3000);
    };

    const handleLogout = async () => {
        try {
            await userService.logout(user.name);
        } catch {

        }
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <div className="container my-4">
            <div className="border bg-white">
                <div className="py-3 text-center border-bottom">
                    <h5 className="fw-bold mb-0 text-dark">Thông tin cá nhân</h5>
                </div>

                <div className="row g-0">
                    <AccountSidebar
                        user={user}
                        activeTab={activeTab}
                        onSelectTab={setActiveTab}
                        onUpdateAvatar={(avatar) => handleChangeInfo(user.name, avatar)}
                        onLogout={handleLogout}
                    />

                    <div className="col-12 col-md-9 p-4 p-md-5">
                        {activeTab === 'profile' && (
                            <ProfileInfoSection
                                user={user}
                                onSaveProfile={(name) => handleChangeInfo(name, user.avatar || '')}
                            />
                        )}

                        {activeTab === 'recent' && (
                            <>
                                <h4 className="text-uppercase fw-normal text-dark mb-4">ĐỌC GẦN ĐÂY</h4>
                                <p className="text-muted">Chưa có bài viết nào.</p>
                            </>
                        )}

                        {activeTab === 'commented' && (
                            <>
                                <h4 className="text-uppercase fw-normal text-dark mb-4">TIN ĐÃ BÌNH LUẬN</h4>
                                <p className="text-muted">Chưa có bình luận nào.</p>
                            </>
                        )}

                        {activeTab === 'password' && (
                            <>
                                <h4 className="text-uppercase fw-normal text-dark mb-4">ĐỔI MẬT KHẨU</h4>
                                {pwdMsg && <div className="alert alert-info py-2 mb-4">{pwdMsg}</div>}
                                <form onSubmit={handleChangePassword}>
                                    <div className="row mb-4 align-items-center">
                                        <label className="col-sm-3 col-form-label text-muted">Mật khẩu mới</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="password"
                                                className="form-control rounded-1 py-2"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-4 align-items-center">
                                        <label className="col-sm-3 col-form-label text-muted">Nhập lại mật khẩu</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="password"
                                                className="form-control rounded-1 py-2"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="text-end mt-4">
                                        <button
                                            type="submit"
                                            className="btn text-white fw-bold px-4 py-2"
                                            style={{ backgroundColor: '#e31818', borderRadius: '6px' }}
                                        >
                                            Cập nhật
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}