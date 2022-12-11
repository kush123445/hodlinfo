import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';
//import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
//import ToolkitProvider,{CSVExport} from 'react-bootstrap-table2-toolkit'
import { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import './App.css';
import Workbook from 'react-excel-workbook'
import * as XLSX from 'xlsx'
function Second(props) {
  console.log("second")
  const { ExportCSVButton } = CSVExport;

  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [excelData, setExcelData] = useState(null);

  let [final, setfinal] = useState([]);
  let [Level, setLevel] = useState([]);
  let [child_submit, setchild_submit] = useState(new Map())
  let [childterminate, setchildterminate] = useState(false)
  let [hash, sethash] = useState(new Map())
  let [ans, setans] = useState(new Map())
  let [parent, setparent] = useState(new Map())
  let [children, setchildren] = useState(new Map())
  const [val, setval] = useState("")

  let [L, setL] = useState([false, false, false]);
  let v = [false, false, false]
  // let k=[false,false,false];
  let [k, setk] = useState([false, false, false])
  // let [k,setk]=useState([])
  let [product, setproduct] = useState([{}]);

  const fileType = ["application/vnd.ms-excel", ".xlsx"];


  console.log("khandelwal", props.final)
  const columns = [
    {
      dataField: 'id',
      text: 'id',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
    },

    {
      dataField: 'sep',
      text: 'sep',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
    },

    {
      dataField: 'Global_KPI_Code',
      text: 'Global_KPI_Code',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
    },

    {
      dataField: 'MICS_Code',
      text: 'MICS_Code',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
        width: '1000px',
      },
      hidden: true,
    },
    {
      dataField: 'MICS_L1_Threshold',
      text: 'MICS_L1_Threshold',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
      // events: {
      //     onClick: (e, column, columnIndex, row, rowIndex) => {
      //       console.log(e);
      //       console.log(column);
      //       console.log(columnIndex);
      //       console.log(row);
      //       console.log(rowIndex);
      //       //alert('Click on Product ID field');
      //     }},
    },
    {
      dataField: 'MICS_L2_Threshold',
      text: 'MICS_L2_Threshold',
      editable: false,

      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
    },
    {
      dataField: 'MICS_L3_Threshold',
      text: 'MICS_L3_Threshold',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
    },
    {
      dataField: 'Positive_Direction',
      text: 'Positive_Direction',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
    },

    {
      dataField: 'Entity_ID',
      text: 'Entity_ID',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
    },

    {
      dataField: 'Period_From',
      text: 'Period_From',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
    },

    {
      dataField: 'Period_To',
      text: 'Period_To',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      hidden: true,
    },

    {
      dataField: 'Numerator',
      text: 'Numerator',
      editable: (content, row, rowIndex, columnIndex) => row.id == 2,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      style: (cell, row, rowIndex, colIndex) => {
        return {
          backgroundColor: 'white',
          border: '1px solid gold',
        };
      },
    },

    {
      dataField: 'Denominator',
      text: 'Denominator',
      editable: (content, row, rowIndex, columnIndex) => row.id == 2,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
      style: (cell, row, rowIndex, colIndex) => {
        return {
          backgroundColor: 'white',
          border: '1px solid gold',
        };
      },
    },

    {
      dataField: 'KPI_Value',
      text: 'KPI_Value',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
    },
    {
      dataField: 'Month',
      text: 'Month',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
    },

    {
      dataField: 'L1_Result',
      text: 'L1_Result',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
    },

    {
      dataField: 'L2_Result',
      text: 'L2_Result',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
    },

    {
      dataField: 'L3_Result',
      text: 'L3_Result',
      editable: false,
      headerStyle: {
        backgroundColor: '#f1c40f',
        color: '#000000',
        fontWeight: '700',
      },
    },
  ];

  // const columns = [
  //     {
  //         dataField: 'id',
  //         text: 'id',
  //         editable: false,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //         hidden: true
  //     },

  //     {
  //         dataField: 'sep',
  //         text: 'sep',
  //         editable: false,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //         hidden: true
  //     },




  //     {
  //         dataField: 'Global_KPI_Code',
  //         text: 'Global_KPI_Code',
  //         editable: false,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //     },

  //     {
  //         dataField: 'MICS_Code',
  //         text: 'MICS_Code',
  //         editable: false,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //             width: '1000px'


  //         },


  //     }, {
  //         dataField: 'MICS_L1_Threshold',
  //         text: 'MICS_L1_Threshold',
  //         editable: false,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',

  //         },
  //         // events: {
  //         //     onClick: (e, column, columnIndex, row, rowIndex) => {
  //         //       console.log(e);
  //         //       console.log(column);
  //         //       console.log(columnIndex);
  //         //       console.log(row);
  //         //       console.log(rowIndex);
  //         //       //alert('Click on Product ID field');
  //         //     }},
  //     },
  //     {
  //         dataField: 'MICS_L2_Threshold',
  //         text: 'MICS_L2_Threshold',
  //         editable: false,

  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //     },
  //     {
  //         dataField: 'MICS_L3_Threshold',
  //         text: 'MICS_L3_Threshold',
  //         editable: false,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //     },
  //     {
  //         dataField: 'Positive_Direction',
  //         text: 'Positive_Direction',
  //         editable: false,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //     },

  //     {
  //         dataField: 'Entity_ID',
  //         text: 'Entity_ID',
  //         editable: false,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //     },


  //     {
  //         dataField: 'Period_From',
  //         text: 'Period_From',
  //         editable: false,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //     },

  //     {
  //         dataField: 'Period_To',
  //         text: 'Period_To',
  //         editable: false,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //     },

  //     {
  //         dataField: 'Numerator',
  //         text: 'Numerator',
  //         editable: (content, row, rowIndex, columnIndex) => row.id == 2,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //     },

  //     {
  //         dataField: 'Denominator',
  //         text: 'Denominator',
  //         editable: (content, row, rowIndex, columnIndex) => row.id == 2,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //         style: (cell, row, rowIndex, colIndex) => {

  //             return {
  //                 backgroundColor: 'white',
  //                 border: '1px solid red',

  //             };
  //         }
  //     },

  //     {
  //         dataField: 'KPI_Value',
  //         text: 'KPI_Value',
  //         editable: false,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //     },

  //     {
  //         dataField: 'L1_Result',
  //         text: 'L1_Result',
  //         editable: false,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //     },


  //     {
  //         dataField: 'L2_Result',
  //         text: 'L2_Result',
  //         editable: false,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //     },

  //     {
  //         dataField: 'L3_Result',
  //         text: 'L3_Result',
  //         editable: false,
  //         headerStyle: {
  //             backgroundColor: '#f1c40f',
  //             color: '#000000',
  //             fontWeight: '700',
  //         },
  //     },




  // ];


  let parent_arr = [{
    ques_text: " Below are the key requirements linked to L1 MICS Description and would require your response to assess compliance with L1",
    level: [

      { L: "Approval evidence along with supporting documents on MJE are archived in a ticketing tool or in SAP?" },
      { L: "Approver and requestor authorized to park/post MJE in SAP" },
      { L: "For MJE Posted without park & Post, detective review is executed before or on WD10. Further, whether on quarterly basis, access to direct post (without park) is reviewed and confirmed?" }
    ],
    parent: 1,
    terminate: 0,
    parent_id: "",
    id: "soo1",
    Yes: "soo2",
    No: "soo3"

  },

  {


    ques_text: " Below are the key requirements linked to L2 MICS Description and would require your response to assess compliance with L2",
    level: [
      { L: "Whether manual journal entries are managed in a workflow tool to ensure:a) mandatory attachments are included &b) auto posting of manual journal entries following the necessary approvals provided in the system" },
      { L: "All changes in the workflow configuration are approved by Zone Internal Control before the changes are made." },
      { L: "For MJEs not categorized speciafically, (e.g. reclassification, corrections) a common and standardized zone template is in place to justify the underlying data of the amounts defined in the journal entry." }
    ],
    parent: 1,
    terminate: 0,
    parent_id: "",
    id: "soo4",
    Yes: "soo5",
    No: "soo6"


  },

  {

    ques_text: `Is L3 MICS Description achieved on this control? In addition to the L2 requirements:
        1. Any MJE performed is managed through a workflow tool which guarantees four eye review on every transaction 
        (employees can park & post journal entries, but can never do this on the same journal entry). 
        2. All documentation supporting MJEs is stored together with the journal entry in the system of record (ERP or sub conso system) and no other system.

        Standardization to be achieved to reach L3: Booking of manual journal entries is only performed by the NoCC.`,
    options: [
      { L1: "Yes, passed at Level3" },
      { L2: "No, failed at Level3" },


    ],
    id: "soo7",
    parent_id: ""


  }];
  let child_next = [{

    ques_text: `Based on KPI data in section 2. the control failed at Level choose either of below`,
    option: {
      L1: "Agree with KPI value",
      L2: "KPI calculation is incorrect"
    },
    parent: 0,
    terminate: 0,
    parent_id: "soo1",
    id: "soo2",
    section: 0
  },
  {

    ques_text: `Based on KPI data in section 2. the control failed at Level choose either of below`,
    option: {
      L1: "Agree with KPI value",
      L2: "KPI calculation is incorrect"
    },
    parent: 0,
    terminate: 0,
    parent_id: "soo4",
    id: "soo2",
    section: 0
  },




  ]

  let child = [{

    ques_text: ' Based on above response, the control is assessed as passed at L1. Would you like to report any other deficiency not covered in the points mentioned above? (Please select "No" in case of none of the deficiencies identified)',
    option: "No",
    parent: 0,
    terminate: 0,
    parent_id: "soo1",
    id: "soo2",
    section: 1
  },



  {



    ques_text: ' Based on above response, the control is assessed as passed at L2. Would you like to report any other deficiency not covered in the points mentioned above? ',
    option: "No",
    parent: 0,
    terminate: 0,
    parent_id: "soo4",
    id: "soo5",
    section: 1

  }]

  let terminate = [{
    ques_text: "Based on above response, the control is assessed as failed at L1. Could you please select either of the below options on action Plan   Action plan is a time bound proposition designed to remediate the control breakdown with the objective of ensuring MICS compliance"
    ,
    option: {

      op1: "Action Plan to remediate the controls is already created by aligning with the Zone IC team",
      op2: "Action Plan to remediate the issue is yet to be created and requires alignment with Zone IC team"
    },
    parent: 0,
    terminate: 1,
    parent_id: "soo1",
    id: "soo3",
    section: 1



  },

  {
    ques_text: "Based on above response, the control is assessed as failed at L2. Could you please select either of the below options on the action Plan."
    ,
    option: {

      op1: "Action Plan to remediate the controls is already created by aligning with the Zone IC team",
      op2: "Action Plan to remediate the issue is yet to be created and requires alignment with Zone IC team"
    },
    parent: 0,
    terminate: 1,
    parent_id: "soo4",
    id: "soo3",
    section: 1



  }]


  useEffect(() => {

    setfinal([{
      ques_text: " Below are the key requirements linked to L1 MICS Description and would require your response to assess compliance with L1",
      level: [

        { L: "Approval evidence along with supporting documents on MJE are archived in a ticketing tool or in SAP?" },
        { L: "Approver and requestor authorized to park/post MJE in SAP" },
        { L: "For MJE Posted without park & Post, detective review is executed before or on WD10. Further, whether on quarterly basis, access to direct post (without park) is reviewed and confirmed?" }
      ],
      parent: 1,

      terminate: 0,
      parent_id: "",
      id: "soo1",
      Yes: "soo2",
      No: "soo3"

    }])

    for (let i = 0; i < parent_arr.length; i++) {

      parent.set(parent_arr[i].id, i);
    }

    for (let i = 0; i < child.length; i++) {

      children.set(child[i].id, child[i]);
    }

    console.log(children);

    console.log(parent)
    // setfinal([...final,])

    setproduct([{ sap: 1, Global_KPI_Code: "KPI_ATR_ACCR_02a", id: 1, MICS_Code: "ATR_ACCR_01b-K", MICS_L1_Threshold: "NULL", MICS_L2_Threshold: 0.05, MICS_L3_Threshold: 0.01, Positive_Direction: "Lower is better", Entity_ID: "Argentina", Period_From: "6/1/2022", Period_To: "6/30/2022", Numerator: -61, Denominator: 100, KPI_Value: -0.61, L1_Result: "NA", L2_Result: "Pass", L3_Result: "Pass" },
    { sap: 2, Global_KPI_Code: "KPI_ATR_ACCR_02a", id: 2, MICS_Code: "ATR_ACCR_01b-K", MICS_L1_Threshold: "NULL", MICS_L2_Threshold: 0.05, MICS_L3_Threshold: 0.01, Positive_Direction: "Lower is better", Entity_ID: "Argentina", Period_From: "6/1/2022", Period_To: "6/30/2022", Numerator: null, Denominator: null, KPI_Value: 0, L1_Result: "", L2_Result: "", L3_Result: "" }])




  }, [])
  console.log(final)


  const radio = async (head, level, choose, i) => {
    ans.set(level, choose)
    //setans(...ans,)
    setans(prev => new Map([...prev, [level, choose]]));

    console.log(ans)
    console.log(product)

    // console.log(head.ques_text)
    // console.log(level)
    // console.log(choose)

    hash.set(`${head.ques_text}+${level}`, choose)
    console.log(hash)


    let countt = 0;
    for (let j = 0; j < head.level.length; j++) {

      if (hash.has(`${head.ques_text}+${head.level[j].L}`)) {

        countt++;

      }

    }
    console.log(countt)
    console.log(head.level.length)

    if (countt == head.level.length) {

      let flag = 0;
      for (let i = 0; i < head.level.length; i++) {

        //let temp = hash.get(`${head.ques_text}+${head.level[i].L}`)
        if (hash.get(`${head.ques_text}+${head.level[i].L}`) == "No") {

          flag = 1;
          // return;

        }


      }
      if (flag == 0) {
        let arr = [];
        let j;
        for (let i = 0; i < final.length; i++) {

          if (head.ques_text == final[i].ques_text) {
            arr.push(final[i]);
            j = i;

            //  arr.push(child[0])
            console.log(head)

            console.log(props.L)
            console.log(parent.get(head.id))

            //    setLevel(props.L);
            //  let L = []

            //  L = [false, true, false]
            //  props.setL(props.L)
            console.log(k)
            if (k[parent.get(head.id)] == true) {

              arr.push(child_next[parent.get(head.id)])
            }
            else {
              child_submit.set(head.id, true)
              arr.push(children.get(head.Yes))
            }
            break;



          }

          else {


            arr.push(final[i])


          }
        }

        j = j + 2;
        for (j; j < final.length; j++) {
          arr.push(final[j])


        }
        final = arr;
        setfinal([...final,])
        console.log(product)
        return;
      }
      else {

        //  alert("trminate")


        let arr = [];
        for (let i = 0; i < final.length; i++) {

          if (head.ques_text == final[i].ques_text) {
            // final.push(final[i]);
            arr.push(final[i])
            // arr.push(terminate[0])
            arr.push(terminate[parent.get(final[i].id)])
            break;


          }
          else {
            arr.push(final[i])
          }

        }
        // console.log(arr)
        final = arr;
        setfinal([...final,])
        // setval("terminate")
        return;
      }
    }
    else {
      return;
    }


  }

  const child_part = (head, e,) => {
    setchildterminate(false);
    console.log(e.target.value)
    ans.set(head.ques_text, e.target.value)

    setans(prev => new Map([...prev, [head.ques_text, e.target.value]]));
    console.log(parent.get(head.parent_id) + 1)
    console.log(head)
    console.log(ans)


    let find;
    let flag = 0;
    for (let i = 0; i < final.length; i++) {

      if (final[i].id == head.id) {
        find = i;
      }
      if (final[i].id === parent_arr[parent.get(head.parent_id) + 1].id) {
        flag = i;
      }
    }

    if (find != final.length - 1) {

      if (final[find + 1].terminate == 1) {

        final = final.slice(0, find + 1);

      }
    }

    if (flag != 0) {
      if (parent_arr[parent.get(head.parent_id) + 1].id == parent_arr[parent_arr.length - 1].id) { return; }

      final.push(parent_arr[parent.get(head.parent_id) + 1])
      setfinal([...final,])

      return;
    }


    final.push(parent_arr[parent.get(head.parent_id) + 1])
    setfinal([...final,])
    return;

  }

  const child_terminate = (head, e) => {
    // console.log(e.target)

    hash.set(head.ques_text, e.target.value)
    console.log("kushal")
    child_submit.set(head.id, true)

    console.log(head.ques_text)
    console.log(e.target.value)
    ans.set(head.ques_text, e.target.value)

    setans(prev => new Map([...prev,]));
    console.log(ans)

    let arr = [];
    for (let i = 0; i < final.length; i++) {

      if (head.ques_text == final[i].ques_text) {
        // final.push(final[i]);
        arr.push(final[i])
        // arr.push(terminate[0])
        // arr.push(terminate[parent.get(final[i].id)])
        break;


      }
      else {
        arr.push(final[i])
      }

    }
    // console.log(arr)
    if (e.target.type == "text") {

      arr.push(terminate[parent.get(head.parent_id)])
      final = arr;
      setfinal([...final,])
      // setval("terminate")
      // setchildterminate(true)
      return;
    }

    final = arr;
    setfinal([...final,])
    // setval("terminate")
    setchildterminate(true)
    return;

  }
  const click = () => {
    setchildterminate(false);

    for (let i = 0; i < final.length; i++) {

      if (final[i].parent_id == "") {


        console.log(final[i].ques_text);
        for (let j = 0; j < final[i].level.length; j++) {

          console.log(`${final[i].level[j].L}`)
          console.log(hash.get(`${final[i].ques_text}+${final[i].level[j].L}`))
        }
      }
    }
  }
  const upload = () => {
    alert("radha")
  }
  const data1 = [
    {
      foo: '123',
      bar: '456',
      baz: '789'
    },
    {
      foo: 'abc',
      bar: 'dfg',
      baz: 'hij'
    },
    {
      foo: 'aaa',
      bar: 'bbb',
      baz: 'ccc'
    }
  ]

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };

      } else {
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      console.log(data);

      for (let i = 0; i < product.length; i++) {
        product[i].Denominator = data[i].Denominator;
        product[i].Numerator = data[i].Numerator;
        product[i].KPI_Value = (product[i].Numerator / product[i].Denominator);



        if (product[i].Positive_Direction == "Lower is better") {


          if (product[i].KPI_Value < product[i].MICS_L1_Threshold && product[i].MICS_L1_Threshold != "NULL") {
            product[i].L1_Result = "PASS"
          }
          else {
            if (product[i].MICS_L1_Threshold == "NULL") {
              product[i].L1_Result = "NA"
            }
            else {
              product[i].L1_Result = "Fail"
            }

          }

          if (product[i].KPI_Value < product[i].MICS_L2_Threshold) {
            product[i].L2_Result = "PASS"
          }
          else {
            product[i].L2_Result = "Fail"
          }

          if (product[i].KPI_Value < product[i].MICS_L3_Threshold) {
            product[i].L3_Result = "PASS"
          }
          else {
            product[i].L3_Result = "Fail"
          }

        }

        else if (product[i].Positive_Direction == "Higher is better") {

          if (product[i].KPI_Value > product[i].MICS_L1_Threshold && product[i].MICS_L1_Threshold != "NULL") {
            product[i].L1_Result = "PASS"
          }
          else {
            if (product[i].MICS_L1_Threshold == "NULL") {
              product[i].L1_Result = "NA"
            }
            else {
              product[i].L1_Result = "Fail"
            }

          }

          if (product[i].KPI_Value > product[i].MICS_L2_Threshold) {
            product[i].L2_Result = "PASS"
          }
          else {
            product[i].L2_Result = "Fail"
          }

          if (product[i].KPI_Value > product[i].MICS_L3_Threshold) {
            product[i].L3_Result = "PASS"
          }
          else {
            product[i].L3_Result = "Fail"
          }



        }

        else if (product[i].Positive_Direction == "Lower is bad") {


          if (product[i].KPI_Value < product[i].MICS_L1_Threshold && product[i].MICS_L1_Threshold != "NULL") {
            product[i].L1_Result = "Fail"
          }
          else {
            if (product[i].MICS_L1_Threshold == "NULL") {
              product[i].L1_Result = "NA"
            }
            else {
              product[i].L1_Result = "Pass"
            }

          }

          if (product[i].KPI_Value < product[i].MICS_L2_Threshold) {
            product[i].L2_Result = "Fail"
          }
          else {
            product[i].L2_Result = "Pass"
          }

          if (product[i].KPI_Value < product[i].MICS_L3_Threshold) {
            product[i].L3_Result = "Fail"
          }
          else {
            product[i].L3_Result = "Pass"
          }
        }

        else if (product[i].Positive_Direction == "Higher is bad") {

          if (product[i].KPI_Value > product[i].MICS_L1_Threshold && product[i].MICS_L1_Threshold != "NULL") {
            product[i].L1_Result = "Fail"
          }
          else {
            if (product[i].MICS_L1_Threshold == "NULL") {
              product[i].L1_Result = "NA"
            }
            else {
              product[i].L1_Result = "Pass"
            }

          }

          if (product[i].KPI_Value > product[i].MICS_L2_Threshold) {
            product[i].L2_Result = "Fail"
          }
          else {
            product[i].L2_Result = "Pass"
          }

          if (product[i].KPI_Value > product[i].MICS_L3_Threshold) {
            product[i].L3_Result = "Fail"
          }
          else {
            product[i].L3_Result = "Pass"
          }


        }

        console.log(product[i].L2_Result);
        console.log(product[i].L3_Result)

      }


      k = [false, false, false];


      for (let i = 0; i < product.length; i++) {
        if (product[i].L1_Result === "Fail") {
          //setL.L[0](true)
          console.log("1")
          k[0] = true;

        }
        if (product[i].L2_Result === "Fail") {
          //L[1] = true
          //  setL(L[1](true));
          console.log("2")
          k[1] = true;
        }
        if (product[i].L3_Result === "Fail") {
          // L[2] = true
          console.log("3")
          k[2] = true;
        }

        console.log(k)
        setk([...k,])


      }
      console.log(product)
      document.getElementById('uploadfile').value = "";
       
      while(final.length > 0) {
        final.pop();
    }
  console.log(final)

  // for(let j=0;j<parent_arr[0].level.length;j++){

  //   ans.delete(parent_arr[0].level[j].L)
  // }

  ans.clear()
  hash.clear()

  final.push(parent_arr[0]);

  console.log(final)
  setfinal([...final ,])


      setproduct([...product,])
    } else {
      setExcelData(null);
    }
  };

  return (
    <>



      <div className="text " id="my_table">
        <h1>Excel file upload & Download</h1>
        <div id="my_btns">



          <div className="row " id="export_button_right" >
            <Workbook filename="data.xlsx" element={<button className="export_button">Export To Excel</button>}>
              <Workbook.Sheet data={product} name="Sheet A">
                <Workbook.Column label="Denominator" value="Denominator" />
                <Workbook.Column label="Numerator" value="Numerator" />

              </Workbook.Sheet>

            </Workbook>
          </div>

          <form onSubmit={handleSubmit} id="combine_btn">
            <label class="submit_btn" for="uploadfile">Upload File</label>
            <input type="file" placeholder="Name" id="uploadfile" onChange={handleFile} />
            <button type='submit' className="submit_btn">Submit</button>
          </form>

        </div>



        <BootstrapTable keyField="id" data={product} columns={columns} className="container" responsive cellEdit={cellEditFactory({
          mode: 'click', blurToSave: true,

          beforeSaveCell: (oldValue, newValue, row, column) => {
            console.log(product)
            console.log('Before Saving Cell!!');

            if (column.dataField == "Denominator") {
              product[row.id - 1].Denominator = newValue;
              console.log("kushal")
            }
            if (column.dataField == "Numerator") {
              product[row.id - 1].Numerator = newValue;
              console.log("khandelwal")
            }
            row.KPI_Value = (row.Numerator / row.Denominator)

            console.log(product)

          },
















          afterSaveCell: (oldValue, newValue, row, column, keyField, rowIndex) => {
            console.log(oldValue, newValue, row.id, column.dataField)
            // if (column.dataField == "Denominator") {
            //     product[row.id - 1].Denominator = newValue;
            //     console.log("kushal")
            // }
            // if (column.dataField == "Numerator") {
            //     product[row.id - 1].Numerator = newValue;
            //     console.log("khandelwal")
            // }
            // row.KPI_Value = (row.Numerator / row.Denominator)
            if (row.Denominator == null) {
              return;
            }


            if (row.Positive_Direction == "Lower is better") {


              if (row.KPI_Value < row.MICS_L1_Threshold && row.MICS_L1_Threshold != "NULL") {
                row.L1_Result = "PASS"
              }
              else {
                if (row.MICS_L1_Threshold == "NULL") {
                  row.L1_Result = "NA"
                }
                else {
                  row.L1_Result = "Fail"
                }

              }

              if (row.KPI_Value < row.MICS_L2_Threshold) {
                row.L2_Result = "PASS"
              }
              else {
                row.L2_Result = "Fail"
              }

              if (row.KPI_Value < row.MICS_L3_Threshold) {
                row.L3_Result = "PASS"
              }
              else {
                row.L3_Result = "Fail"
              }

            }

            else if (row.Positive_Direction == "Higher is better") {

              if (row.KPI_Value > row.MICS_L1_Threshold && row.MICS_L1_Threshold != "NULL") {
                row.L1_Result = "PASS"
              }
              else {
                if (row.MICS_L1_Threshold == "NULL") {
                  row.L1_Result = "NA"
                }
                else {
                  row.L1_Result = "Fail"
                }

              }

              if (row.KPI_Value > row.MICS_L2_Threshold) {
                row.L2_Result = "PASS"
              }
              else {
                row.L2_Result = "Fail"
              }

              if (row.KPI_Value > row.MICS_L3_Threshold) {
                row.L3_Result = "PASS"
              }
              else {
                row.L3_Result = "Fail"
              }



            }

            else if (row.Positive_Direction == "Lower is bad") {


              if (row.KPI_Value < row.MICS_L1_Threshold && row.MICS_L1_Threshold != "NULL") {
                row.L1_Result = "Fail"
              }
              else {
                if (row.MICS_L1_Threshold == "NULL") {
                  row.L1_Result = "NA"
                }
                else {
                  row.L1_Result = "Pass"
                }

              }

              if (row.KPI_Value < row.MICS_L2_Threshold) {
                row.L2_Result = "Fail"
              }
              else {
                row.L2_Result = "Pass"
              }

              if (row.KPI_Value < row.MICS_L3_Threshold) {
                row.L3_Result = "Fail"
              }
              else {
                row.L3_Result = "Pass"
              }
            }

            else if (row.Positive_Direction == "Higher is bad") {

              if (row.KPI_Value > row.MICS_L1_Threshold && row.MICS_L1_Threshold != "NULL") {
                row.L1_Result = "Fail"
              }
              else {
                if (row.MICS_L1_Threshold == "NULL") {
                  row.L1_Result = "NA"
                }
                else {
                  row.L1_Result = "Pass"
                }

              }

              if (row.KPI_Value > row.MICS_L2_Threshold) {
                row.L2_Result = "Fail"
              }
              else {
                row.L2_Result = "Pass"
              }

              if (row.KPI_Value > row.MICS_L3_Threshold) {
                row.L3_Result = "Fail"
              }
              else {
                row.L3_Result = "Pass"
              }


            }

            console.log(row.L2_Result);
            console.log(row.L3_Result)

            k = [false, false, false];


            for (let i = 0; i < product.length; i++) {
              if (product[i].L1_Result === "Fail") {
                //setL.L[0](true)
                console.log("1")
                k[0] = true;

              }
              if (product[i].L2_Result === "Fail") {
                //L[1] = true
                //  setL(L[1](true));
                console.log("2")
                k[1] = true;
              }
              if (product[i].L3_Result === "Fail") {
                // L[2] = true
                console.log("3")
                k[2] = true;
              }

              console.log(k)
              setk([...k,])


            }
            console.log(product)


          }
        })} />
      </div>

      {




      }


      {
        final.map((item) =>
          item.id == 'soo7' ? (
            <div className="card border-0 child">
              <div className="card-body text">
                <strong className="card-text ">
                  Is L3 MICS Description achieved on this control? In addition to the L2 requirements:
                </strong>
                <br></br>
                <strong className="card-text">
                  {' '}
                  1. Any MJE performed is managed through a workflow tool which guarantees four eye
                  review on every transaction (employees can park & post journal entries, but can
                  never do this on the same journal entry).
                </strong>
                <br></br>
                <strong className="card-text">
                  2. All documentation supporting MJEs is stored together with the journal entry in
                  the system of record (ERP or sub conso system) and no other system.
                </strong>
                <br></br>
                <br></br>
                <strong className="card-text">
                  {' '}
                  Standardization to be achieved to reach L3: Booking of manual journal entries is
                  only performed by the NoCC.`,
                </strong>
                <br></br>

                <div>
                  <input type="radio" id={item.options.L1} name={item.ques_text}></input>
                  <label style={{ fontSize: '19px', marginLeft: '8px' }} for={item.options.L1}>
                    {item.options[0].L1}
                  </label>
                </div>
                <div>
                  <input type="radio" id={item.options.L2} name={item.ques_text}></input>
                  <label style={{ fontSize: '19px', marginLeft: '8px' }} for={item.options.L2}>
                    {item.options[1].L2}
                  </label>
                </div>
              </div>
              <Button
                className="mt-3"
                variant="warning"
                onClick={click}
                style={{ fontSize: '20px', height: ' 50px', width: '100%' }}
                type="button"
              >
                SUBMIT
              </Button>{' '}
            </div>
          ) : item.terminate == 1 ? (
            <div>
              <div className="card border-0 child">
                <div className="card-body text">
                  <strong
                    className="card-text "
                    style={{ fontWeight: 'bolder', fontSize: '19px', marginBottom: '26px' }}
                  >
                    {' '}
                    {item.ques_text}
                  </strong>
                  <br></br>
                  <br></br>

                  <div>
                    <input type="radio" id={item.option.op1} checked={ans.get(item.ques_text) == item.option.op1 ? true : false} value={item.option.op1} name={item.ques_text} onChange={() => { ans.set(item.ques_text, item.option.op1); console.log(ans); setans(prev => new Map([...prev,])); }}></input>
                    <label style={{ fontSize: '19px', marginLeft: '8px' }} for={item.option.op1}>
                      {item.option.op1}
                    </label>
                  </div>
                  <div>
                    <input type="radio" id={item.option.op2} checked={ans.get(item.ques_text) == item.option.op2 ? true : false} value={item.option.op2} name={item.ques_text} onChange={() => { ans.set(item.ques_text, item.option.op2); console.log(ans); setans(prev => new Map([...prev,])); }}></input>
                    <label style={{ fontSize: '19px', marginLeft: '8px' }} for={item.option.op2}>
                      {item.option.op2}
                    </label>
                  </div>
                  <div>
                    <input type="text" class="form-control" placeholder=""></input>
                  </div>
                </div>
              </div>
              <h6 style={{ color: 'red', paddingTop: '7px' }}>
                Based on above response, the control is assessed as failed at L
                {parent.get(item.parent_id) + 1}
              </h6>
              <Button
                className="mt-3"
                variant="warning"
                onClick={click}
                style={{ fontSize: '20px', height: ' 50px', width: '100%' }}
                type="button"
              >
                SUBMIT
              </Button>{' '}
            </div>
          ) : item.parent == 1 ? (
            <div>
              <div className="card border-0 child">
                <div className="card-body text">
                  <strong
                    className="card-text "
                    style={{ fontWeight: 'bolder', fontSize: '19px', marginBottom: '26px' }}
                  >
                    {' '}
                    {item.ques_text}
                  </strong>
                  <br></br>
                  <br></br>
                  <div className="w-100">
                    {item.level.map((opt, i) => (
                      <>
                        <div className="d-flex justify-content-around">
                          <div className="w-50">
                            <label style={{ fontSize: '19px' }}>{opt.L}</label>
                          </div>
                          <div className="d-flex  w-25  justify-content-between m-5">
                            <div className="mb-2">
                              <input
                                type="radio"

                                name={opt.L}
                                checked={ans.get(opt.L) === 'yes' ? true : false}

                                onChange={() => {
                                  radio(item, opt.L, 'yes', i);
                                }}
                              ></input>
                              <label style={{ fontSize: '19px', marginLeft: '8px' }} for={opt.L}>
                                Yes
                              </label>
                            </div>
                            <div className="mb-2">
                              <input
                                type="radio"

                                name={opt.L}
                                checked={ans.get(opt.L) === 'No' ? true : false}
                                onChange={() => {
                                  radio(item, opt.L, 'No', i);
                                }}
                              ></input>
                              <label style={{ fontSize: '19px', marginLeft: '8px' }} for={opt.L}>
                                No
                              </label>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <br></br>
                </div>
              </div>
            </div>
          ) : item.section == 0 ? (
            <div>
              <div className="card border-0 child">
                <div className="card-body text">
                  <strong className="card-text ">
                    {item.ques_text}
                  </strong>
                  <br></br>
                  <br></br>
                  <div>
                    <input
                      type="radio"
                      id={item.ques_text}
                      name={item.ques_text}
                      checked={ans.get(item.ques_text) == "Agree with KPI value" ? true : false}
                      value={"Agree with KPI value"}
                      onChange={(e) => {
                        child_part(item, e);
                      }}
                    ></input>
                    <label style={{ fontSize: '24px' }} for={item.ques_text}>
                      Agree with KPI value
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id={item.ques_text}
                      name={item.ques_text}
                      checked={ans.get(item.ques_text) == "KPI calculation is incorrect" ? true : false}
                      value={"KPI calculation is incorrect"}
                      onChange={(e) => {
                        child_part(item, e);
                      }}
                    ></input>
                    <label style={{ fontSize: '24px' }} for={item.ques_text}>
                      KPI calculation is incorrect
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="card border-0 child">
                <div className="card-body text">
                  <strong
                    className="card-text "
                    style={{ fontWeight: 'bolder', fontSize: '19px', marginBottom: '26px' }}
                  >
                    {' '}
                    {item.ques_text}
                  </strong>
                  <br></br>
                  <br></br>
                  <div>
                    <input
                      type="radio"
                      id={item.ques_text}
                      name={item.ques_text}
                      value={"No"}

                      checked={ans.get(item.ques_text) == "No" ? true : false}
                      onChange={(e) => {
                        child_part(item, e, "No");
                        document.getElementById(item.id).disabled = true
                      }}
                    ></input>
                    <label style={{ fontSize: '19px', marginLeft: '8px' }} for={item.ques_text}>
                      No
                    </label>
                  </div>
                  <div>
                    <div>
                      <input
                        type="radio"
                        id={item.ques_text}
                        name={item.ques_text}
                        checked={ans.get(item.ques_text) == "yes" ? true : false}
                        onChange={(e) => {
                          document.getElementById(item.id).disabled = false
                          ans.delete(item.ques_text)
                          ans.set(item.ques_text, "yes")
                          console.log(ans)



                          setans(prev => new Map([...prev,]));
                        }}
                      ></input>
                      <label style={{ fontSize: '19px', marginLeft: '8px' }} for={item.ques_text}>
                        Yes
                      </label>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter value first"
                      id={item.id}
                      value={hash.get(item.ques_text)}
                      onChange={(e) => {
                        child_terminate(item, e);
                      }}
                    ></input>
                    {childterminate == true && child_submit.get(item.id) == true ? (
                      <div>
                        <h6 style={{ color: 'red', paddingTop: '7px' }}>
                          Based on above response, the control is assessed as failed at L
                          {parent.get(item.parent_id) + 1}
                        </h6>
                        <Button
                          className="mt-3"
                          variant="warning"
                          onClick={click}
                          style={{ fontSize: 24, height: ' 50px', width: '100%' }}
                          type="button"
                        >
                          SUBMIT
                        </Button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ),
        )


      }


    </>
  )
}

export default Second
