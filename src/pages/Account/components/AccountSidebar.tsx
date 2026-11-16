import { useState } from 'react';
import type { User } from '../../../types/user';

export default function AccountSidebar({
                                           user,
                                           activeTab,
                                           onSelectTab,
                                           onUpdateAvatar,
                                           onLogout
                                       }: {
    user: User;
    activeTab: string;
    onSelectTab: (tab: string) => void;
    onUpdateAvatar: (avatar: string) => Promise<void>;
    onLogout: () => void;
}) {
    const [editAvatar, setEditAvatar] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(user.avatar || '');

    const menus = [
        { key: 'profile', label: 'Thông tin tài khoản' },
        { key: 'recent', label: 'Đọc gần đây' },
        { key: 'commented', label: 'Tin đã bình luận' },
        { key: 'password', label: 'Đổi mật khẩu' }
    ];

    const handleSaveAvatar = async () => {
        await onUpdateAvatar(avatarUrl.trim());
        setEditAvatar(false);
    };

    return (
        <div className="col-12 col-md-3 border-end p-4">
            <div className="d-flex align-items-center gap-3 pb-3 mb-3 border-bottom">
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="rounded-1 object-fit-cover flex-shrink-0"
                        style={{ width: '56px', height: '56px' }}
                    />
                ) : (
                    <div
                        className="rounded-1 text-white d-flex align-items-center justify-content-center fs-3 flex-shrink-0"
                        style={{ width: '56px', height: '56px', backgroundColor: '#9c4dcc' }}
                    >
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                )}

                <div className="overflow-hidden">
                    <div className="fw-bold text-dark text-truncate" style={{ fontSize: '15px' }}>
                        {user.name}
                    </div>
                    <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none"
                        style={{ fontSize: '13px', color: '#2b80ff' }}
                        onClick={() => setEditAvatar(!editAvatar)}
                    >
                        Sửa ảnh
                    </button>
                </div>
            </div>

            {editAvatar && (
                <div className="mb-3 d-flex gap-1">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Dán link ảnh..."
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                    />
                    <button type="button" className="btn btn-sm btn-danger" onClick={handleSaveAvatar}>
                        Lưu
                    </button>
                </div>
            )}

            <ul className="list-unstyled mb-0 d-flex flex-column gap-3 mt-2">
                {menus.map((m) => (
                    <li key={m.key}>
                        <button
                            type="button"
                            onClick={() => onSelectTab(m.key)}
                            className={`btn btn-link p-0 text-decoration-none fw-bold ${
                                activeTab === m.key ? 'text-danger' : 'text-dark'
                            }`}
                            style={{ fontSize: '15px' }}
                        >
                            {m.label}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        type="button"
                        onClick={onLogout}
                        className="btn btn-link p-0 text-decoration-none fw-bold text-dark"
                        style={{ fontSize: '15px' }}
                    >
                        Đăng xuất
                    </button>
                </li>
            </ul>
        </div>
    );
}