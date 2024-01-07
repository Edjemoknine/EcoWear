export default {

    name:"product",
    title:"Product",
    type:"document",
    fields:[
        {
         name:"name",
         title:"Name of product",
         type:"string",
        },
        {
            name:"description",
            title:"Description of product",
            type:"text",

        },
        {
            name:"Price",
            title:"Price of product",
            type:"number",
        },
        {
            name:"image",
            title:"Image of product",
            type:"array",
            of:[{type:"image"}]

        },
        {
            name:"Slug",
            title:"Slug of product",
            type:"slug",
            options:{
                source:"name",
            }
        },
        {
            name:"category",
            title:"Category of product",
            type:"reference",
            to:[{type:"category"}]
        },
        {
            name:"featured",
            title:"Featured products",
            type:"boolean",
        }
    ]
}