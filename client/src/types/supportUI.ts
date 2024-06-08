import { SvgIconComponent } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface ColorButtonCustom {
    background : string;
    borderColor : string;
    hover: {
        backgroundColor : string;
        borderColor : string;
    }
}

export interface CriteriaType {
    label : string;
    condition : number[]; 
}

export type TypeSort = 'NORMAL' | 'ASC' | 'DESC' ; 
export interface ColumnType {
    id : string;
    nameCol : string;
    width ?: number;
    isSorted ?: boolean;
    criteria ?: CriteriaType[];
}

export type ColumnTypeProps = Omit<ColumnType , 'typeSort'>

export interface OptionSelect {
    label : string; 
    value : string | number;
}

export interface propsTypeButton {
    id: string;
    form?: any;
    label: string;
    value?: string | number;
    name: string;
    checked?: boolean;
    disabled?: boolean;
    onChange: () => void
}
export interface MenuAdmin {
    name : string;
    endpoint : string;
    Icon : SvgIconComponent;
    childrenMenu : MenuAdmin[];
}