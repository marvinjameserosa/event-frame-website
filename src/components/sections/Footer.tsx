const BottomLabel: React.FC = () => {
    return (
        <footer className="w-full text-center text-xs text-gray-500 py-4">
            <div className="max-w-7xl mx-auto">
                {`© ${new Date().getFullYear()} FrameIt. All rights reserved.`}
            </div>
        </footer>
    );
};
export default BottomLabel;
