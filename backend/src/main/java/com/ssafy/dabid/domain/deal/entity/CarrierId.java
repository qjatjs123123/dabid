package com.ssafy.dabid.domain.deal.entity;

public enum CarrierId {
    KR_ACTCORE_OCEAN_INBOUND("kr.actcore.ocean-inbound"),
    KR_CJLOGISTICS("kr.cjlogistics"),
    KR_COUPANGLS("kr.coupangls"),
    KR_CUPOST("kr.cupost"),
    KR_CHUNILPS("kr.chunilps"),
    KR_CVSNET("kr.cvsnet");

    private String carrierId;

    private CarrierId(String carrierId) {this.carrierId = carrierId;}

    public String getCarrierId() {return carrierId;}

}
