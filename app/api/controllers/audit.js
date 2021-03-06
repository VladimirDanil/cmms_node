    const auditModel = require('../models/audit');		
    
    module.exports = {
        getById: async function(req, res, next) {	
                
            await auditModel.findById(req.params.auditId, async function(err, audit){
                if (err) {
                    res.status(400).json({ msg: "Not found" });
                } else {
                    let result={audit};
                    res.status(200).json({msg: "Asset found!", data: result});
                }
            });
        },
        getByFilterId :async function(req, res, next) {	
                
            var temp_filterIds=req.params.Id;
            temp_filterIds=temp_filterIds.split(",");
            auditModel.find({intCategoryID:{ $in: temp_filterIds}}, function(err, audits){
                if (err){
                    res.status(500).json({ msg: "Internal Server error." });
                } else{				
                    res.status(200).json({msg: "List found!", data: audits});							
                }
            });
        }, 
        getAll: function(req, res, next) {
            auditModel.find({}, function(err, audits){
                if (err){
                    res.status(500).json({ msg: "Internal Server error." });
                } else{				
                    res.status(200).json({msg: "List found!", data: audits});							
                }
            });
        },
        updateById: function(req, res, next) {
            var audit = {};
            var smsAuditPlan = {};
            var smsAuditReport = {};
            var ncrcar = {};
            
            audit.strTitle = req.body.strTitle;
            audit.strStatus = req.body.strStatus;
            audit.strDepartmentVessel = req.body.strDepartmentVessel;
            audit.strAuditNo = req.body.strAuditNo;
            audit.strAuditor = req.body.strAuditor;
            audit.strAuditee = req.body.strAuditee;
            audit.strSMSReference = req.body.strSMSReference;
            audit.strISMReference = req.body.strISMReference;
            // input SmsAuditPlan
            if (req.body.smsAuditPlan.strInternalSmsAuditPlan !== undefined)
                smsAuditPlan.strInternalSmsAuditPlan = req.body.smsAuditPlan.strInternalSmsAuditPlan;
            if (req.body.smsAuditPlan.aDate !== undefined)
                smsAuditPlan.aDate = req.body.smsAuditPlan.aDate;
            if (req.body.smsAuditPlan.aOpenMeetingBegin !== undefined)
                smsAuditPlan.aOpenMeetingBegin = req.body.smsAuditPlan.aOpenMeetingBegin;
            if (req.body.smsAuditPlan.aOpenMeetingClose !== undefined)
                smsAuditPlan.aOpenMeetingClose = req.body.smsAuditPlan.aOpenMeetingClose;
            if (req.body.smsAuditPlan.aOpenMeetingPresent !== undefined)
                smsAuditPlan.aOpenMeetingPresent = req.body.smsAuditPlan.aOpenMeetingPresent;
            if (req.body.smsAuditPlan.strOpenMeetingDetails !== undefined)
                smsAuditPlan.strOpenMeetingDetails = req.body.smsAuditPlan.strOpenMeetingDetails;
            if (req.body.smsAuditPlan.aConductAuditBegin !== undefined)
                smsAuditPlan.aConductAuditBegin = req.body.smsAuditPlan.aConductAuditBegin;
            if (req.body.smsAuditPlan.aConductAuditClose !== undefined)
                smsAuditPlan.aConductAuditClose = req.body.smsAuditPlan.aConductAuditClose;
            if (req.body.smsAuditPlan.strConductAuditDetail !== undefined)
                smsAuditPlan.strConductAuditDetail = req.body.smsAuditPlan.strConductAuditDetail;
            if (req.body.smsAuditPlan.aCloseMeetingBegin !== undefined)
                smsAuditPlan.aCloseMeetingBegin = req.body.smsAuditPlan.aCloseMeetingBegin;
            if (req.body.smsAuditPlan.aCloseMeetingClose !== undefined)
                smsAuditPlan.aCloseMeetingClose = req.body.smsAuditPlan.aCloseMeetingClose;
            if (req.body.smsAuditPlan.aCloseMeetingPresent !== undefined)
                smsAuditPlan.aCloseMeetingPresent = req.body.smsAuditPlan.aCloseMeetingPresent;
            if (req.body.smsAuditPlan.strCloseMeetingDetails !== undefined)
                smsAuditPlan.strCloseMeetingDetails = req.body.smsAuditPlan.strCloseMeetingDetails;
            audit.aSmsAuditPlan = smsAuditPlan;
            // input SmsAuditReport
            if (req.body.smsAuditReport.strInternalSmsAuditReport !== undefined)
                smsAuditReport.strInternalSmsAuditReport = req.body.smsAuditReport.strInternalSmsAuditReport;
            if (req.body.smsAuditReport.aDate !== undefined)
                smsAuditReport.aDate = req.body.smsAuditReport.aDate;
            if (req.body.smsAuditReport.strNCRCARNo !== undefined)
                smsAuditReport.strNCRCARNo = req.body.smsAuditReport.strNCRCARNo;
            if (req.body.smsAuditReport.strNCStatement !== undefined)
                smsAuditReport.strNCStatement = req.body.smsAuditReport.strNCStatement;
            if (req.body.smsAuditReport.strImmediateAction !== undefined)
                smsAuditReport.strImmediateAction = req.body.smsAuditReport.strImmediateAction;
            if (req.body.smsAuditReport.aImmediateCompletionDate !== undefined)
                smsAuditReport.aImmediateCompletionDate = req.body.smsAuditReport.aImmediateCompletionDate;
            if (req.body.smsAuditReport.strFurtherAction !== undefined)
                smsAuditReport.strFurtherAction = req.body.smsAuditReport.strFurtherAction;
            if (req.body.smsAuditReport.aFurtherCompletionDate !== undefined)
                smsAuditReport.aFurtherCompletionDate = req.body.smsAuditReport.aFurtherCompletionDate;
            if (req.body.smsAuditReport.strFollowUpDetail !== undefined)
                smsAuditReport.strFollowUpDetail = req.body.smsAuditReport.strFollowUpDetail;
            if (req.body.smsAuditReport.strCorrectiveAction !== undefined)
                smsAuditReport.strCorrectiveAction = req.body.smsAuditReport.strCorrectiveAction;
            audit.aSmsAuditReport = smsAuditReport;
            // input NCRCAR
            if (req.body.NCRCAR.strNCRPersonName !== undefined)
                ncrcar.strNCRPersonName = req.body.NCRCAR.strNCRPersonName;
            if (req.body.NCRCAR.aReportDate !== undefined)
                ncrcar.aReportDate = req.body.NCRCAR.aReportDate;
            if (req.body.NCRCAR.strNCState !== undefined)
                ncrcar.strNCState = req.body.NCRCAR.strNCState;
            if (req.body.NCRCAR.strISMPart !== undefined)
                ncrcar.strISMPart = req.body.NCRCAR.strISMPart;
            if (req.body.NCRCAR.strSMSPart !== undefined)
                ncrcar.strSMSPart = req.body.NCRCAR.strSMSPart;
            if (req.body.NCRCAR.strCorrectiveAction !== undefined)
                ncrcar.strCorrectiveAction = req.body.NCRCAR.strCorrectiveAction;
            if (req.body.NCRCAR.strImmediateAction !== undefined)
                ncrcar.strImmediateAction = req.body.NCRCAR.strImmediateAction;
            if (req.body.NCRCAR.strImmediatePersonName !== undefined)
                ncrcar.strImmediatePersonName = req.body.NCRCAR.strImmediatePersonName;
            if (req.body.NCRCAR.aImmediateCompetionDate !== undefined)
                ncrcar.aImmediateCompetionDate = req.body.NCRCAR.aImmediateCompetionDate;
            if (req.body.NCRCAR.strFurtherAction !== undefined)
                ncrcar.strFurtherAction = req.body.NCRCAR.strFurtherAction;
            if (req.body.NCRCAR.strFurtherPersonName !== undefined)
                ncrcar.strFurtherPersonName = req.body.NCRCAR.strFurtherPersonName;
            if (req.body.NCRCAR.aFurtherCompetionDate !== undefined)
                ncrcar.aFurtherCompetionDate = req.body.NCRCAR.aFurtherCompetionDate;
            if (req.body.NCRCAR.strVerificationCorrectiveAction !== undefined)
                ncrcar.strVerificationCorrectiveAction = req.body.NCRCAR.strVerificationCorrectiveAction;
            if (req.body.NCRCAR.strFollowUpDetail !== undefined)
                ncrcar.strFollowUpDetail = req.body.NCRCAR.strFollowUpDetail;
            if (req.body.NCRCAR.strCorrectionAction !== undefined)
                ncrcar.strCorrectiveActionClose = req.body.NCRCAR.strCorrectiveActionClose;
            audit.aNCRCAR = ncrcar;
            // input SmsAuditInspection
            audit.aSmsAuditInspection = req.body.smsAuditInspection;
            
            auditModel.findByIdAndUpdate(req.params.auditId, audit, function(err, update){
                if(err)
                    res.status(400).json({ msg: "Update failed!" });
                else {
                    res.status(200).json({ msg: "Updated successfully!", data:null});
                }
            });
        },

        deleteById: async function(req, res, next) {
            auditModel.findByIdAndRemove(req.params.auditId, function(err, movieInfo){
                if(err)
                    res.status(400).json({ msg: "Delete failed!" });
                else {
                    res.status(200).json({ msg: "Deleted successfully!"});
                }
            });


        },

        create: async function(req, res, next) {
            var audit = {};
            var smsAuditPlan = {};
            var smsAuditReport = {};
            var ncrcar = {};
            
            audit.strCode = "strCode";
            audit.strTitle = req.body.strTitle;
            audit.strStatus = req.body.strStatus;
            audit.strDepartmentVessel = req.body.strDepartmentVessel;
            audit.strAuditor = req.body.strAuditor;
            audit.strAuditee = req.body.strAuditee;
            audit.strSMSReference = req.body.strSMSReference;
            audit.strISMReference = req.body.strISMReference;
            // input SmsAuditPlan
            if (req.body.smsAuditPlan.strInternalSmsAuditPlan !== undefined)
                smsAuditPlan.strInternalSmsAuditPlan = req.body.smsAuditPlan.strInternalSmsAuditPlan;
            if (req.body.smsAuditPlan.aDate !== undefined)
                smsAuditPlan.aDate = req.body.smsAuditPlan.aDate;
            if (req.body.smsAuditPlan.aOpenMeetingBegin !== undefined)
                smsAuditPlan.aOpenMeetingBegin = req.body.smsAuditPlan.aOpenMeetingBegin;
            if (req.body.smsAuditPlan.aOpenMeetingClose !== undefined)
                smsAuditPlan.aOpenMeetingClose = req.body.smsAuditPlan.aOpenMeetingClose;
            if (req.body.smsAuditPlan.aOpenMeetingPresent !== undefined)
                smsAuditPlan.aOpenMeetingPresent = req.body.smsAuditPlan.aOpenMeetingPresent;
            if (req.body.smsAuditPlan.strOpenMeetingDetails !== undefined)
                smsAuditPlan.strOpenMeetingDetails = req.body.smsAuditPlan.strOpenMeetingDetails;
            if (req.body.smsAuditPlan.aConductAuditBegin !== undefined)
                smsAuditPlan.aConductAuditBegin = req.body.smsAuditPlan.aConductAuditBegin;
            if (req.body.smsAuditPlan.aConductAuditClose !== undefined)
                smsAuditPlan.aConductAuditClose = req.body.smsAuditPlan.aConductAuditClose;
            if (req.body.smsAuditPlan.strConductAuditDetail !== undefined)
                smsAuditPlan.strConductAuditDetail = req.body.smsAuditPlan.strConductAuditDetail;
            if (req.body.smsAuditPlan.aCloseMeetingBegin !== undefined)
                smsAuditPlan.aCloseMeetingBegin = req.body.smsAuditPlan.aCloseMeetingBegin;
            if (req.body.smsAuditPlan.aCloseMeetingClose !== undefined)
                smsAuditPlan.aCloseMeetingClose = req.body.smsAuditPlan.aCloseMeetingClose;
            if (req.body.smsAuditPlan.aCloseMeetingPresent !== undefined)
                smsAuditPlan.aCloseMeetingPresent = req.body.smsAuditPlan.aCloseMeetingPresent;
            if (req.body.smsAuditPlan.strCloseMeetingDetails !== undefined)
                smsAuditPlan.strCloseMeetingDetails = req.body.smsAuditPlan.strCloseMeetingDetails;
            audit.aSmsAuditPlan = smsAuditPlan;
            // input SmsAuditReport
            if (req.body.smsAuditReport.strInternalSmsAuditReport !== undefined)
                smsAuditReport.strInternalSmsAuditReport = req.body.smsAuditReport.strInternalSmsAuditReport;
            if (req.body.smsAuditReport.aDate !== undefined)
                smsAuditReport.aDate = req.body.smsAuditReport.aDate;
            if (req.body.smsAuditReport.strNCRCARNo !== undefined)
                smsAuditReport.strNCRCARNo = req.body.smsAuditReport.strNCRCARNo;
            if (req.body.smsAuditReport.strNCStatement !== undefined)
                smsAuditReport.strNCStatement = req.body.smsAuditReport.strNCStatement;
            if (req.body.smsAuditReport.strImmediateAction !== undefined)
                smsAuditReport.strImmediateAction = req.body.smsAuditReport.strImmediateAction;
            if (req.body.smsAuditReport.aImmediateCompletionDate !== undefined)
                smsAuditReport.aImmediateCompletionDate = req.body.smsAuditReport.aImmediateCompletionDate;
            if (req.body.smsAuditReport.strFurtherAction !== undefined)
                smsAuditReport.strFurtherAction = req.body.smsAuditReport.strFurtherAction;
            if (req.body.smsAuditReport.aFurtherCompletionDate !== undefined)
                smsAuditReport.aFurtherCompletionDate = req.body.smsAuditReport.aFurtherCompletionDate;
            if (req.body.smsAuditReport.strFollowUpDetail !== undefined)
                smsAuditReport.strFollowUpDetail = req.body.smsAuditReport.strFollowUpDetail;
            if (req.body.smsAuditReport.strCorrectiveAction !== undefined)
                smsAuditReport.strCorrectiveAction = req.body.smsAuditReport.strCorrectiveAction;
            audit.aSmsAuditReport = smsAuditReport;
            // input NCRCAR
            if (req.body.NCRCAR.strNCRPersonName !== undefined)
                ncrcar.strNCRPersonName = req.body.NCRCAR.strNCRPersonName;
            if (req.body.NCRCAR.aReportDate !== undefined)
                ncrcar.aReportDate = req.body.NCRCAR.aReportDate;
            if (req.body.NCRCAR.strNCState !== undefined)
                ncrcar.strNCState = req.body.NCRCAR.strNCState;
            if (req.body.NCRCAR.strISMPart !== undefined)
                ncrcar.strISMPart = req.body.NCRCAR.strISMPart;
            if (req.body.NCRCAR.strSMSPart !== undefined)
                ncrcar.strSMSPart = req.body.NCRCAR.strSMSPart;
            if (req.body.NCRCAR.strCorrectiveAction !== undefined)
                ncrcar.strCorrectiveAction = req.body.NCRCAR.strCorrectiveAction;
            if (req.body.NCRCAR.strImmediateAction !== undefined)
                ncrcar.strImmediateAction = req.body.NCRCAR.strImmediateAction;
            if (req.body.NCRCAR.strImmediatePersonName !== undefined)
                ncrcar.strImmediatePersonName = req.body.NCRCAR.strImmediatePersonName;
            if (req.body.NCRCAR.aImmediateCompetionDate !== undefined)
                ncrcar.aImmediateCompetionDate = req.body.NCRCAR.aImmediateCompetionDate;
            if (req.body.NCRCAR.strFurtherAction !== undefined)
                ncrcar.strFurtherAction = req.body.NCRCAR.strFurtherAction;
            if (req.body.NCRCAR.strFurtherPersonName !== undefined)
                ncrcar.strFurtherPersonName = req.body.NCRCAR.strFurtherPersonName;
            if (req.body.NCRCAR.aFurtherCompetionDate !== undefined)
                ncrcar.aFurtherCompetionDate = req.body.NCRCAR.aFurtherCompetionDate;
            if (req.body.NCRCAR.strVerificationCorrectiveAction !== undefined)
                ncrcar.strVerificationCorrectiveAction = req.body.NCRCAR.strVerificationCorrectiveAction;
            if (req.body.NCRCAR.strFollowUpDetail !== undefined)
                ncrcar.strFollowUpDetail = req.body.NCRCAR.strFollowUpDetail;
            if (req.body.NCRCAR.strCorrectionAction !== undefined)
                ncrcar.strCorrectiveActionClose = req.body.NCRCAR.strCorrectiveActionClose;
            audit.aNCRCAR = ncrcar;
            // input SmsAuditInspection
            audit.aSmsAuditInspection = req.body.smsAuditInspection;

            await	auditModel.create(audit, function (err, result) {

                if (err) {
                    if (err.errors) {
                        if (err.errors.strNCRPersonName) {
                            res.status(400).json({ msg: err.errors.strNCRPersonName.message });
                            return;
                        }
                    }
                    res.status(400).json({ msg: "Creat failed", data: null});
                }				  
                else{
                    var update_audit={};
                    update_audit.strCode = "AD#" + result._id;
                    auditModel.findByIdAndUpdate(result._id, update_audit, function(err, update){
                        res.status(201).json({msg: "Saved successfully!", data: {id:result._id, strCode:update_audit.strCode}});
                    })
                }    
            });
        }

    }		