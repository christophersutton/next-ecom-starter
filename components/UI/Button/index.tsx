enum Shape {
    Rect = "RECT",
    Pill = "PILL"
}

enum Size {
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    Full = 'FULL'
}

enum Color {
    Primary = 'PRIMARY',
    Secondary = 'SECONDARY',
    White = 'WHITE'
}

export interface ButtonProps {
    size?: Size
    shape?: Shape
    color?: Color
    onClick: any
    children: any
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { size, color, shape, onClick, children } = props;

    var classes = "inline-flex justify-center px-12 py-3 border border-transparent text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    
    shape === "PILL" ? classes += ' rounded-full ' : null
    color === "PRIMARY" || color == null ? classes += ' text-white bg-indigo-600 hover:bg-indigo-800 ' : null
    size === 'FULL' ? classes += ' w-full text-center ' : null

    return (
        <button type="button" onClick={() => onClick()} className={classes}>
            {children}
        </button>
    )
}

export default Button 

export const CircularButton = (props, children) => {

    const { size } = props;

    switch (size) {
        case 'xs': {
            <button type="button" className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {children}
            </button>
        }
    }

}