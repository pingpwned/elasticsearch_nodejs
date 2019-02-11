<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="xml" version="1.0"
        encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <xsl:for-each select="/SHOP/SHOPITEM">
            <xsl:call-template name="SHOPITEM"/>
        </xsl:for-each>
    </xsl:template>
    <xsl:template match="SHOPITEM" name="SHOPITEM">
        <SHOPITEM>
            <ITEM_ID>
                <xsl:value-of select="ITEM_ID" />
            </ITEM_ID>
            <PRODUCTNAME>
                <xsl:value-of select="PRODUCTNAME" />
            </PRODUCTNAME>
            <EAN>
                <xsl:value-of select="EAN" />
            </EAN>
            <ISBN>
                <xsl:value-of select="ISBN" />
            </ISBN>
            <PRICE_VAT>
                <xsl:value-of select="PRICE_VAT" />
            </PRICE_VAT>
            <DESCRIPTION>
                <xsl:value-of select="DESCRIPTION" />
            </DESCRIPTION>
            <CATEGORYTEXT>
                <xsl:value-of select="CATEGORYTEXT" />
            </CATEGORYTEXT>
            <URL>
                <xsl:value-of select="URL" />
            </URL>
            <IMGURL>
                <xsl:value-of select="IMGURL" />
            </IMGURL>
            <xsl:call-template name="PARAMS"/>
            <xsl:call-template name="CONTRIBUTOR"/>
        </SHOPITEM>
    </xsl:template>
    <xsl:template match="/SHOP/SHOPITEM/PARAM" name="PARAMS">
        <PARAMS>
            <xsl:for-each select="PARAM">
                <PARAM>
                    <PARAM_NAME>
                        <xsl:value-of select="PARAM_NAME" />
                    </PARAM_NAME>
                    <VAL>
                        <xsl:value-of select="VAL" />
                    </VAL>
                </PARAM>
            </xsl:for-each>
        </PARAMS>
    </xsl:template>
    <xsl:template match="/SHOP/SHOPITEM/CONTRIBUTOR" name="CONTRIBUTOR">
        <CONTRIBUTORS>
            <xsl:for-each select="CONTRIBUTOR">
                <CONTRIBUTOR>
                    <ROLE>
                        <xsl:value-of select="ROLE" />
                    </ROLE>
                    <NAME>
                        <xsl:value-of select="NAME" />
                    </NAME>
                    <SURNAME>
                        <xsl:value-of select="SURNAME" />
                    </SURNAME>
                </CONTRIBUTOR>
            </xsl:for-each>
        </CONTRIBUTORS>
    </xsl:template>
</xsl:stylesheet>