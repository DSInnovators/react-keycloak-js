package com.dsi.banbeis.response;

import lombok.Data;

import java.io.Serializable;


@Data
public class VehicleTaggingResponse implements Serializable {

    private String personName;

    private String registrationNo;
    private String chassisNo;
    private String engineNo;
    private String modelYear;

}
