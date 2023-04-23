package com.example;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import javax.ws.rs.BadRequestException;

@QuarkusTest
public class AlticciServiceTest {

    @Inject
    AlticciService alticciService;

    @Test
    public void testAlticci() {
        // Test first 10 values of the sequence
        int[] expectedValues = {0, 1, 1, 1, 2, 2, 3, 4, 5, 7};
        for (int i = 0; i < expectedValues.length; i++) {
            int actualValue = alticciService.getAlticci(i);
            Assertions.assertEquals(expectedValues[i], actualValue);
        }
    }

    @Test
    public void testNegativeIndex() {
        int n = -1;
        Exception caughtException = null;
        try {
            alticciService.getAlticci(n);
        } catch (Exception e) {
            caughtException = e;
        }
        Assertions.assertNotNull(caughtException);
        Assertions.assertTrue(caughtException instanceof BadRequestException);
    }
}
