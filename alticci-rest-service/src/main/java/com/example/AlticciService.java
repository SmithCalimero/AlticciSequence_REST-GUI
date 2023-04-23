package com.example;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.BadRequestException;
import io.quarkus.cache.CacheResult;
import io.quarkus.cache.CacheManager;
import io.quarkus.cache.CacheInvalidate;
import javax.inject.Inject;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/alticci") // define the base path for the AlticciService endpoint
@Tag(name = "Alticci Sequence API", description = "Operations related to the Alticci sequence") // provide documentation for the API using the Tag annotation
public class AlticciService {

    @Inject // Inject a CacheManager instance to access the cache
    CacheManager cacheManager;

    @GET // specify that this method should handle GET requests
    @Path("/{n}") // define the path of the endpoint and the {n} path parameter
    @Produces(MediaType.APPLICATION_JSON) // specify that the response should be in JSON format
    @Operation(summary = "Get the value of the Alticci sequence at a specific index n") // provide documentation for the operation using the Operation annotation
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "Success. The value of the Alticci sequence at the specified index n"),
            @APIResponse(responseCode = "400", description = "Invalid input parameter"),
            @APIResponse(responseCode = "500", description = "Internal server error")
    }) // provide documentation for the expected responses using the APIResponses annotation
    public int getAlticci(@Parameter(description = "The index of the Alticci sequence value to retrieve") @PathParam("n") int n) {
        // define the getAlticci method that takes in a path parameter n and returns an integer
        if (n < 0) { // if the input index is negative
            throw new BadRequestException("Index must be non-negative"); // throw a BadRequestException
        }
        return alticci(n); // return the value of the Alticci sequence at the specified index
    }

    @CacheResult(cacheName = "alticci-cache") // cache the results of this method using the CacheResult annotation
    //must be public since caching annotations are not allowed on a private method
    public int alticci(int n) { // define the alticci method that takes in an integer n and returns an integer
        if (n == 0) { // if the index is 0
            return 0;
        } else if (n == 1 || n == 2) { // if the index is 0
            return 1;
        } else { // anything else
            return alticci(n - 3) + alticci(n - 2); // calculates the nth value of the Alticci sequence recursively
        }
    }

    @POST // specify that this method should handle POST requests
    @Path("/clearCache") // define the path of the endpoint
    @CacheInvalidate(cacheName = "alticci-cache")
    public void clearCache() {
        // This method body is intentionally empty
    }
}
