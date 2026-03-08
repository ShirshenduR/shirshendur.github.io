// TerminalWindow — reusable macOS terminal chrome
export function TerminalWindow({ title = "bash", children, style = {} }) {
    return (
        <div className="tw" style={style}>
            <div className="tw-bar">
                <span className="tw-dot dot-r" />
                <span className="tw-dot dot-y" />
                <span className="tw-dot dot-g" />
                <span className="tw-title">{title}</span>
            </div>
            <div className="tw-body">{children}</div>
        </div>
    )
}
