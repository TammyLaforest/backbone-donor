


<h2><%- rc.listTitle %></h2>

    <ul><% _.each( rc.listItems, function( listItem ){ %>

        <li>
            <%- listItem.name %>
			            <% if ( listItem.hasOlympicGold ){ %>
                <em>*</em>
                <% } %>
			        </li>
        <% }); %>
			</ul>
    <% var showFootnote = _.any(
        _.pluck(rc.listItems, "hasOlympicGold")
    ); %>

			<% if (showFootnote) { %>
    <p style="font-size: 12px ;">
        <em>* Olympic gold medalist</em>
    </p>
    <% } %>