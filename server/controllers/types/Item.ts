export interface CustomFields {
    customIntField1?: number;
    customIntField2?: number;
    customIntField3?: number;
    customStrField1?: string;
    customStrField2?: string;
    customStrField3?: string;
    customBoolField1?: boolean;
    customBoolField2?: boolean;
    customBoolField3?: boolean;
    customDateField1?: Date;
    cusotmDateField2?: Date;
    customDateField3?: Date;
}

export interface Item {
    name: string,
    description: string,
    customFields?: CustomFields,
}
