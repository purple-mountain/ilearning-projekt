export interface CustomFieldsName {
    customIntFieldName1?: string;
    customIntFieldName2?: string;
    customIntFieldName3?: string;
    customStrFieldName1?: string;
    customStrFieldName2?: string;
    customStrFieldName3?: string;
    customBoolFieldName1?: string;
    customBoolFieldName2?: string;
    customBoolFieldName3?: string;
    customDateFieldName1?: string;
    customDateFieldName2?: string;
    customDateFieldName3?: string;
}

export interface Collection {
    name: string,
    description: string,
    topicName: string,
    customFieldsName?: CustomFieldsName,
    id?: string,
}
